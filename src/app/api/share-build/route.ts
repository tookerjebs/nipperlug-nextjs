import { NextRequest, NextResponse } from 'next/server';

interface GistFile {
  content: string;
}

interface GistData {
  description: string;
  public: boolean;
  files: {
    [filename: string]: GistFile;
  };
}

interface GistResponse {
  id: string;
  html_url: string;
  files: {
    [filename: string]: {
      content: string;
    };
  };
}

export async function POST(request: NextRequest) {
  try {
    const { buildData } = await request.json();
    
    if (!buildData) {
      return NextResponse.json(
        { success: false, error: 'Build data is required' },
        { status: 400 }
      );
    }

    // Get GitHub token from server-side environment variable
    const githubToken = process.env.GITHUB_TOKEN;
    
    if (!githubToken) {
      return NextResponse.json(
        { success: false, error: 'GitHub token not configured on server' },
        { status: 500 }
      );
    }

    const gistData: GistData = {
      description: `Cabal Online Build - ${new Date().toLocaleDateString()}`,
      public: false, // Private gist for user privacy
      files: {
        'cabal-build.json': {
          content: JSON.stringify(buildData, null, 2)
        }
      }
    };

    const response = await fetch('https://api.github.com/gists', {
      method: 'POST',
      headers: {
        'Authorization': `token ${githubToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'
      },
      body: JSON.stringify(gistData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gist creation failed:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      
      if (response.status === 401) {
        return NextResponse.json(
          { success: false, error: 'GitHub token is invalid or expired' },
          { status: 401 }
        );
      }
      
      return NextResponse.json(
        { success: false, error: `Gist creation failed: ${response.status}` },
        { status: response.status }
      );
    }

    const gistResponse: GistResponse = await response.json();
    
    return NextResponse.json({
      success: true,
      gistId: gistResponse.id,
      gistUrl: gistResponse.html_url
    });

  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const gistId = searchParams.get('gistId');
    
    if (!gistId) {
      return NextResponse.json(
        { success: false, error: 'Gist ID is required' },
        { status: 400 }
      );
    }

    // Get GitHub token from server-side environment variable
    const githubToken = process.env.GITHUB_TOKEN;
    
    if (!githubToken) {
      return NextResponse.json(
        { success: false, error: 'GitHub token not configured on server' },
        { status: 500 }
      );
    }

    const response = await fetch(`https://api.github.com/gists/${gistId}`, {
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!response.ok) {
      console.error('Gist fetch failed:', {
        status: response.status,
        statusText: response.statusText,
        gistId
      });
      
      if (response.status === 404) {
        return NextResponse.json(
          { success: false, error: 'Gist not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(
        { success: false, error: `Failed to fetch Gist: ${response.status}` },
        { status: response.status }
      );
    }

    const gistResponse: GistResponse = await response.json();
    
    // Look for the build data file - try multiple possible filenames
    const buildFile = gistResponse.files['cabal-build.json'] || 
                     gistResponse.files['collection-tracker-data.json'] ||
                     Object.values(gistResponse.files)[0]; // Fallback to first file
    
    if (!buildFile) {
      return NextResponse.json(
        { success: false, error: 'No build data found in Gist' },
        { status: 404 }
      );
    }

    try {
      const buildData = JSON.parse(buildFile.content);
      return NextResponse.json({
        success: true,
        data: buildData
      });
    } catch (parseError) {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON in Gist content' },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('API route GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}