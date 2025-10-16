/**
 * Parser script to convert Event_utf8_filtered.txt to JSON
 * Run from project root: node scripts/parse-event-mobs.js
 */

const fs = require('fs');
const path = require('path');

function parseEventMobsFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter(line => line.trim());
  
  // Skip header
  const dataLines = lines.slice(1);
  
  // Parse TSV: SpwnWorld\tPosX\tPosY\tRemark_name
  const parsed = new Map();
  
  for (const line of dataLines) {
    const parts = line.split('\t').map(p => p.trim());
    if (parts.length < 4) continue;
    
    const worldId = parseInt(parts[0]);
    const x = parseInt(parts[1]);
    const y = parseInt(parts[2]);
    const remark = parts[3];
    
    if (isNaN(worldId) || isNaN(x) || isNaN(y)) continue;
    
    // Extract mob name and spawn grouping
    // Format: "Mob Name1_2_3" or "Mob Name" (without grouping)
    const match = remark.match(/^(.+?)(\d+(?:_\d+)*)$/);
    let mobName;
    let spawnGrouping = '';
    
    if (match) {
      mobName = match[1].trim();
      spawnGrouping = match[2];
    } else {
      mobName = remark;
    }
    
    if (!parsed.has(mobName)) {
      parsed.set(mobName, []);
    }
    
    parsed.get(mobName).push({
      worldId,
      x,
      y,
      mobName,
      spawnGrouping,
    });
  }
  
  // Convert to array and sort
  const eventMobs = Array.from(parsed.entries()).map(([name, locations]) => ({
    name,
    spawners: locations.map(loc => ({
      worldId: loc.worldId,
      x: loc.x,
      y: loc.y,
      mobName: loc.mobName,
      spawnGrouping: loc.spawnGrouping || undefined,
    })).sort((a, b) => a.worldId - b.worldId),
  }));
  
  return eventMobs.sort((a, b) => a.name.localeCompare(b.name));
}

function main() {
  try {
    const inputPath = path.join(__dirname, '../Event_utf8_filtered.txt');
    const outputPath = path.join(__dirname, '../src/lib/game-data/event-mobs/event-mobs.json');
    
    console.log(`📖 Parsing ${inputPath}...`);
    const eventMobs = parseEventMobsFile(inputPath);
    
    // Ensure directory exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(outputPath, JSON.stringify(eventMobs, null, 2));
    
    console.log(`✓ Generated ${outputPath}`);
    console.log(`  📊 ${eventMobs.length} unique mobs parsed`);
    console.log(`  📍 ${eventMobs.reduce((sum, m) => sum + m.spawners.length, 0)} total spawn locations`);
    console.log(`\n📝 Sample mob:`);
    console.log(JSON.stringify(eventMobs[0], null, 2));
    
  } catch (error) {
    console.error('❌ Error parsing event mobs:', error);
    process.exit(1);
  }
}

main();