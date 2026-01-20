/**
 * Web Worker for Mouse Position and Distance Calculations
 * Offloads expensive calculations from the main thread to keep UI responsive
 */

self.addEventListener('message', function(e) {
  const { type, data } = e.data;
  
  switch(type) {
    case 'CALCULATE_CARD_POSITION':
      calculateCardPosition(data);
      break;
      
    case 'BATCH_CALCULATE':
      batchCalculatePositions(data);
      break;
      
    default:
      console.warn('Unknown message type:', type);
  }
});

/**
 * Calculate mouse position relative to card and distance from center
 */
function calculateCardPosition(data) {
  const { 
    mouseX, 
    mouseY, 
    rectLeft, 
    rectTop, 
    rectWidth, 
    rectHeight,
    cardId,
    threshold = 200 
  } = data;
  
  // Calculate mouse position relative to card
  const x = mouseX - rectLeft;
  const y = mouseY - rectTop;
  
  // Calculate center point
  const centerX = rectLeft + rectWidth / 2;
  const centerY = rectTop + rectHeight / 2;
  
  // Calculate distance from center using Pythagorean theorem
  const distance = Math.sqrt(
    Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
  );
  
  // Determine if mouse is within threshold
  const isNear = distance <= threshold;
  
  // Calculate normalized distance (0 to 1)
  const normalizedDistance = Math.min(distance / threshold, 1);
  
  // Calculate opacity based on distance
  const opacity = isNear ? Math.max(0.8 * (1 - normalizedDistance), 0.1) : 0;
  
  // Send results back to main thread
  self.postMessage({
    type: 'POSITION_CALCULATED',
    cardId,
    result: {
      x,
      y,
      distance,
      isNear,
      opacity,
      normalizedDistance
    }
  });
}

/**
 * Batch calculate positions for multiple cards
 */
function batchCalculatePositions(data) {
  const { mouseX, mouseY, cards, threshold = 200 } = data;
  
  const results = cards.map(card => {
    const { rectLeft, rectTop, rectWidth, rectHeight, cardId } = card;
    
    const x = mouseX - rectLeft;
    const y = mouseY - rectTop;
    const centerX = rectLeft + rectWidth / 2;
    const centerY = rectTop + rectHeight / 2;
    const distance = Math.sqrt(
      Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
    );
    const isNear = distance <= threshold;
    const normalizedDistance = Math.min(distance / threshold, 1);
    const opacity = isNear ? Math.max(0.8 * (1 - normalizedDistance), 0.1) : 0;
    
    return {
      cardId,
      x,
      y,
      distance,
      isNear,
      opacity,
      normalizedDistance
    };
  });
  
  self.postMessage({
    type: 'BATCH_CALCULATED',
    results
  });
}

// Error handling
self.addEventListener('error', function(e) {
  console.error('Worker error:', e.message);
});
