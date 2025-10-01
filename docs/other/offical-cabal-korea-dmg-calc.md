ATTENTION: this has been copy pasted from for dmg calculation research purposes !  https://cabal.co.kr/gameInfo/forcebook/%EC%BA%90%EB%A6%AD%ED%84%B0%EB%8A%A5%EB%A0%A5%EC%B9%98#:~:text=%EC%82%AC%EC%9A%A9%ED%95%9C%20%EA%B3%B5%EA%B2%A9%20%EC%8A%A4%ED%82%AC%EC%97%90%20%EB%94%B0%EB%9D%BC%20%EA%B8%B0%EB%B3%B8%20%EB%8D%B0%EB%AF%B8%EC%A7%80%20%EA%B3%84%EC%82%B0%EC%86%8C%EB%93%9C%20%EC%8A%A4%ED%82%AC,%EB%B0%8F%20%EB%AC%B4%EC%8B%9C%20%EC%83%81%EC%87%84)%20%EA%B0%92%EC%97%90%20%EB%94%B0%EB%9D%BC%20%EB%8D%B0%EB%AF%B8%EC%A7%80%20%EA%B0%90%EC%86%8C%EC%9C%A8%20%EC%A0%81%EC%9A%A9

and translated via google. However the page is official, its from cabal online official page ! but be catious when it comes to the information here. This should just be a basic rundown. 

Character Stats
PVP / PVE stats are applied in the same way as the stat description below when fighting against players and monsters.
Attack/defense judgment is made in the following order. (Exceptions such as complete evasion / invincibility)


Hit (Evasion) Judgment (Miss if Successful Evasion)
▶ Hit, Successful Attack (Defense) Successful Decision (Block for Successful Defense)
▶ Successful Attack, Damage Calculation


Damage is roughly calculated in the following order:


1. Calculate basic damage according to the attack skill used When using a sword skill, calculate basic damage according to the attack power, Sword skill amplification (ignores amplification resistance and resistance), and calculate basic damage according to each skill's unique additional attack value When using
magic skill, magic attack, magic skill amplification (ignores amplification resistance and resistance), and additional attack power unique to each skill



2. Determine whether a critical hit is successful based on the critical probability (ignoring probability resistance and resistance) value When a critical hit is successful, the critical damage value is calculated according to the value of basic damage and critical damage (ignoring resistance and resistance) (at least 20% is applied) When a critical is failed, the normal damage value is calculated according to the basic damage plus normal attack damage and normal damage decrease value, and the minimum damage value is added when using a sword skill Critical Damage - (Critical Damage Resistance - Critical Damage Resistance Ignoring) is (1+Normal Damage Increase)*(1-Normal Damage Increase)


Damage Reduction) value, if normal damage is greater than Critical Damage ( (Critical Damage Resistance - Ignore Critical Damage Resistance) value is less than 0, compensated to 0)


3. Damage reduction rate is applied to the damage result of 2 according to the values of defense and penetration (ignoring penetration and offsetting ignore).


4. Applies additional damage increase and decrease based on the value of additional damage and damage reduction (ignore and offset ignore) to the damage result of 3 5. Applies additional damage increase to Elite/boss monsters and additional damage increase rate to Elite/boss monsters to damage result of 4




6. Apply the final damage increase and final damage decrease ratio to the damage result of 5




Attack Stats
Stats	explanation	Related Stats
Damage	Attack stats applied when calculating damage of sword-type skills.
When all ATK increases, the same value is increased	Armor
Magic Attack	Attack stats that are applied when calculating the damage of Magic skills.
When all ATK increases, the same value is increased	Armor
Attack Rate	Attack success rate. It is calculated with the opponent's defense rate stat to determine whether or not to block.
Final block probability is calibrated to a minimum of 0% and a maximum of 95%. Successful attacks are determined after a successful hit (5% attack success guaranteed)	ERA
Critical Chance	If the attack is successful, the chance of a successful critical attack.
Possess 5% of the default when creating a character, calculated by combining it with the target's critical rate resistance.	Critical Chance Cap,
Crit Chance Resistance,
Ignore Crit Chance Resistance
Critical Chance Cap	Currently has 50% of the maximum applicable critical chance when creating
a character	Critical Chance
Critical Damage	Damage multiplier added when a critical attack is successful, and 20% is held when creating a
character. Even if the final calculated damage value is less than 20%, it will be compensated to 20%.	Critical Damage Resistance,
Ignore Critical Damage Resistance
Sword Skill Amplification	Damage multiplier
added when using Sword skills When all skill amplification increases, the same value increases	Skill Amp Resistance,
Ignore Skill Amp Resistance
Magic Skill Amplification	Damage multiplier added when using magic-type skills When
all skill amplification is increased, the same value increases	Skill Amp Resistance,
Ignore Skill Amp Resistance
hit	Determine whether or not to miss by calculating with attack hit rate and opponent evasion stats The
final miss probability is calibrated to a minimum of 0% and a maximum of 95%.
(5% Hit Guarantee)	Dodge,
ignore hits
Penetrating	When calculating damage, a stat that reduces the damage that reduces the opponent's defense.
The damage reduction rate is at least 0.3% and up to 95%, and no matter how high the correction
penetration is, the amount of damage reduced from the base damage will not be reduced to less than 0.3%.
In other words, above a certain level, the damage does not increase due to the increase in penetration value.	Defense,
ignore penetration, ignore
penetration, ignore penetration offset
Additional Damage	A value that is directly added to the damage when calculating damage.	
Minimum Damage	When using a sword-type skill, 80%~100% of the original damage is applied depending on the battle style, and the lower limit is increased by the minimum damage value.
Critical damage is always increased by 100%.
If the default value + additional value is 100%, the damage taken will always remain
100% - Base value for each battlestyle	
Ignore Evasion	When an attack hits (dodge), the target is deducted from the corresponding value and applied.
The final MISS probability is corrected to a minimum of 0% and a maximum of 95%. (5% hit guarantee)	Evasion
Evasion Ignore Offset
Increased final damage	After all damage calculations are completed, the multiplier of damage increases before it is applied.
Calculated by final damage reduction and multiplication. (Damage*(100+Final Damage Increase)*(100-Final Damage Decrease))	All damage-related stats
Ignore damage reduction	When calculating damage, subtract the damage reduction stat of the target from the corresponding value and apply it.
It is only meaningful if the target has a damage reduction.	Damage reduction, ignore damage reduction offset
Ignore Critical Chance Resistance	When calculating Critical Probability, the target's Critical Chance Resistance stat is subtracted by that value.
Meaningful only when the target has Critical Chance Resistance.	Critical Chance Resistance
Ignore Critical Damage Resistance	When calculating critical damage, the target's critical damage resistance stat is subtracted by the corresponding value.
Meaningful only when the target has critical damage resistance.	Critical Damage Resistance
Ignore Skill Amplification Resistance	When calculating damage, the target is subjected to subtracting the target's Skill Amplification Resistance by that value.
Meaningful only if the target has skill amplification resistance.	Skill Amplification Resistance
Increases Normal Attack Damage	When a critical attack fails, the damage multiplier added is calculated by multiplying the
normal damage reduction.
(Damage*(100+Normal Damage Increase)*(100-Normal Damage Decrease))	Normal Attack Damage Reduction
Offset Ignore Piercing	When calculating damage, the target's Ignore Piercing stat is subtracted by the corresponding value.
Only relevant if the target has Piercing Ignorance.	Ignore Piercing
Increased damage to elite monsters Increased
damage to boss monsters	If the target is a boss/elite monster, the damage will be increased.
Apply before final damage calculation	All damage-related stats
Elite monsters additional damage Boss
monsters additional damage	If the target is a boss/elite monster, the damage multiplier will be added.
The additional damage is applied according to the attacker's attacker's attack/magic attack multiplier.	Attack, Magic Attack



Defense Stats
Stats	explanation	Related Stats
Armor	When calculating damage, the damage reduction rate of stats
that reduce damage is adjusted to a minimum of 0.3% and a maximum of 95%.
(No matter how high the penetration is, the amount of damage decreased from the base damage will not be reduced to less than 0.3%,
that is, the damage will not increase by increasing the penetration level above a certain level.)	Attack, Magic Attack, Penetration
ERA	Determine whether to block or not by calculating the defense success rate and the opponent's attack rate stats.
The final block probability is corrected to a minimum of 0% and a maximum of 95%.
Successful attack is judged after successful hit (5% attack success guaranteed)	Attack Rate
evasion	Evasion success rate, calculated with the opponent's hit stats to determine whether or not to miss.
The final miss probability is adjusted to a minimum of 0% and a maximum of 95%. (5% hit guarantee)	Hit, Ignore Dodge
Damage Reduction	Decreases the opponent's damage by the corresponding value.	Ignore damage falloff
Critical Chance Resistance	When hit, the probability is applied by deducting the value from the opponent's critical chance stat	Critical Chance, Ignore Critical Chance Resistance
Critical Damage Resistance	When hit by a critical attack, the damage is applied by deducting the corresponding value from the opponent's critical damage stat
(both monsters and characters use critical attacks)	Critical Damage, Ignore Critical Damage Resistance
Skill Amplification Resistance	When hit, damage is applied by deducting the corresponding value from each amplification stat according to the opponent's skill type (Sword/Magic)
Currently, only the player character is used for skill attacks (monsters do not have skill attacks)	Sword Skill Amplification, Magic Skill Amplification, Skill Amplification Resistance Ignore
Ignore Piercing	When hit, the corresponding value is subtracted from the opponent's penetration stat, and the damage reduction rate applied
is adjusted to a minimum of 0.3% and a maximum of 95%.
(No matter how high the penetration is, the amount of damage reduced from the base damage will not be reduced by less than 0.3%,
that is, the damage will not increase by increasing the penetration level above a certain level.)	Penetration, Penetration Ignore Offset
Ignoring Hits	When calculating attack hits (evasion), the opponent's hit stats are deducted by the corresponding value, and the
final miss chance is adjusted to a minimum of 0% and a maximum of 95%. (5% hit guarantee)	hit
Ignore damage reduction offset	When hit, the corresponding value is deducted from the opponent's damage reduction ignore stat, so it is meaningful only if the
damage target ignores damage reduction.	Ignore damage reduction
Ignore Evasion Offset	When calculating attack hits (evasion), subtract the corresponding value from the opponent's evasion ignore stat to calculate the
final miss chance to a minimum of 0% and a maximum of 95%. (5% hit guarantee)
Meaningful only if the target ignores evasion	Ignore Evasion
Reduced Final Damage	After all damage calculations are completed, the damage is reduced before it is applied by the multiplier
of the final damage increase and multiplication.
(Damage*(100+Final Damage Increase)*(100-Final Damage Decrease))	All damage-related stats
Reduced normal damage	When normal damage is hit (non-critical among the user's attacks), the damage reduction rate is calculated by multiplying the increase
in normal attack damage. (Damage*(100+Normal Attack Damage Increase)*(100-Normal Damage Reduction))	Increases Normal Attack Damage



Other Stats
Stats	explanation	Related Stats
HP Absorption	The
maximum HP absorbed in proportion to damage when attacking is the upper limit of HP absorption.	HP Absorption Limit
HP Absorption Limit	When absorbing HP, the
minimum amount of HP that can be absorbed per target is 2, and the maximum HP is 5% of the maximum HP.	HP Absorption
HP Auto Recovery	When not combating, the amount of HP that naturally recovers (recovery per 2 seconds) If
you sit in a village or field, (max HP +10) 2% of the value is added.
Regardless of character stats, recover base 2% (per 2 seconds) in villages	
MP Absorption	The
maximum MP absorbed in proportion to the damage when attacking is the upper limit of MP absorption.	MP absorption ceiling
MP absorption ceiling	When absorbing HP, the minimum amount of MP
that can be absorbed per target is 2, and the maximum amount is 5% of the maximum MP.	MP Absorption
MP Auto Recovery	Amount of MP that naturally heals (recovery per 2 seconds)
If you sit in a village or on a field (max MP+30), you will receive an additional 2% of the value. Always recover 2% base (per 2 seconds) regardless of character stats	
Movement speed	Character's movement speedCharacter's
base stats 450	
Increased Battlemode Duration	Battlemode Duration Increase	
Increased Auror Mode Duration	Auror Mode Duration Increase	
Increases HP Potion Recovery	Additional recovery when using HP potions	
Reduced BP consumption	When creating Guild Treasures, the percentage of BP consumed decreases	
Stun Resistance	When stun is detected, probability reduction When
calculating stuns, at least 0% and up to 95%	Ignore Stun Resistance
Down Resistance	When down is judged, probability reduction is calculated at least 0% and up to 95% when
calculating down.	Ignore down resistance
Knockback Resistance	When knockback is judged, probability reduction When
calculating knockback, at least 0% and up to 95%	Ignoring Knockback Resistance
Immovable Resistance	When it is judged that you cannot move, the probability reduction amount	
Suppression Resistance	When suppressed, the probability reduction amount	
Silence Resistance	When Silenced Detects, Chance Reduction	
Ignore down resistance	When it is down, the target's down resistance stat is subtracted by that value, and it is calculated
by at least 0% and up to 95% when calculating down.	Down Resistance
Ignoring Knockback Resistance	When a knockback is detected, the target's knockback resistance stat is deducted by the corresponding value. When
calculating knockback, at least 0% and up to 95%	Knockback Resistance
Ignore Stun Resistance	When stun is detected, the target's stun resistance stat is deducted by that value, and the calculation stun is at least 0% and up to 95% when calculating
stun.	Stun Resistance
Petrification Resistance	When petrified, chance reduction	