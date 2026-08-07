const fs = require('fs');
const path = require('path');

const htmlFile = path.join(__dirname, 'index.html');
const content = fs.readFileSync(htmlFile, 'utf8');
const start = content.indexOf('function buildAssistantReply(text, ctx){');

if (start < 0) {
  console.error('Function not found!');
  process.exit(1);
}

// Find the closing brace
let braceCount = 0;
let end = -1;
for (let i = start + 'function buildAssistantReply(text, ctx){'.length; i < content.length; i++) {
  if (content[i] === '{') braceCount++;
  if (content[i] === '}') {
    braceCount--;
    if (braceCount < 0) {
      end = i + 1;
      break;
    }
  }
}

if (end < 0) {
  console.error('Could not find end of function!');
  process.exit(1);
}

const newFunc = `  function buildAssistantReply(text, ctx){
    const t = text.toLowerCase();
    const hasRain = ctx.rain != null && ctx.rain >= 55;
    const isCool = ctx.temp < 15;
    const isWarm = ctx.temp >= 25;
    const isNice = ctx.temp >= 18 && ctx.temp < 28 && !hasRain;

    // Where to go / Activity suggestions
    if(t.includes('where') || t.includes('go') || t.includes('place') || t.includes('activity') || t.includes('do')){
      if(hasRain) return 'Rains on the way! Perfect for an indoor cafe, museum, movie, or cozy bookstore. Or a brisk walk with a jacket.';
      if(isWarm) return 'Warm and nice - great for parks, outdoor markets, hiking, or exploring. Bring water and sunscreen!';
      if(isNice) return 'Perfect conditions for almost anything! Parks, cafes, shopping, scenic walk. Youve got it made!';
      if(isCool) return 'Chilly, so indoor galleries, cafes, or restaurants are ideal. But brisk outdoor walks are refreshing too!';
    }

    // Umbrella / Rain checks
    if(t.includes('umbrella') || (t.includes('rain') && !t.includes('where'))){
      return hasRain
        ? \`Yep - rain looks likely with about \${ctx.rain}% chance. Bring an umbrella, or plan something indoors.\`
        : 'Looks dry right now, so youre good without one. Check the hourly forecast just in case!';
    }

    // Clothing / Outfit
    if(t.includes('wear') || t.includes('outfit') || t.includes('clothes')){
      if(isWarm) return 'Light, breathable clothes - t-shirt or summer dress. Sunscreen and a hat if youre out for hours!';
      if(isNice) return 'A light layer or sweater should be perfect. The weather is just right for a casual outfit.';
      if(isCool) return 'Layer up! A jacket or hoodie would feel great. Jeans and a cozy sweater combo.';
      return \`It feels around \${fmtTemp(ctx.feels)}, so dress in layers you can adjust.\`;
    }

    // Wind
    if(t.includes('wind') || t.includes('breezy')){
      const windStr = Math.round(ctx.wind);
      if(ctx.wind > 20) return \`Pretty strong at \${windStr} \${windUnitLabel()} - might be a windy walk, but its refreshing!\`;
      if(ctx.wind > 10) return \`Nice breeze at \${windStr} \${windUnitLabel()} - perfect for kite flying or outdoor cafe.\`;
      return \`Wind is calm at around \${windStr} \${windUnitLabel()} - barely noticeable.\`;
    }

    // General vibes
    if(t.includes('vibe') || t.includes('mood') || t.includes('day')){
      if(isNice) return 'Shaping up to be a beautiful day! Get outside and enjoy it.';
      if(hasRain) return 'Cozy kind of day - perfect for indoor adventures or rain-watching with a warm drink.';
      if(isCool) return 'Crisp, energizing day. Great for an active outing or just feeling refreshed.';
      return 'Average weather-wise, but you can make your own adventure!';
    }

    // Default helpful response
    if(isNice){
      return \`It's \${fmtTemp(ctx.temp)} and feels like \${fmtTemp(ctx.feels)} - some of the nicest weather you could ask for!\`;
    }
    return \`It's \${fmtTemp(ctx.temp)} and feels like \${fmtTemp(ctx.feels)}. Check the hourly forecast to plan ahead!\`;
  }`;

const newContent = content.substring(0, start) + newFunc + content.substring(end);
fs.writeFileSync(htmlFile, newContent, 'utf8');
console.log('✓ Successfully updated buildAssistantReply function');
console.log('  - Added location/activity suggestions');
console.log('  - Enhanced "where to go" handling');
console.log('  - Improved temperature-based recommendations');
