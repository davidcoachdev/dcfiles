import gsap from 'gsap';

// Simple animation
gsap.to('.box', { duration: 1, x: 100, opacity: 0.5 });

// Timeline
const tl = gsap.timeline();
tl.to('.box1', { duration: 1, x: 100 })
  .to('.box2', { duration: 1, x: 100 }, 0) // Start at same time
  .to('.box3', { duration: 1, x: 100 }, '-=0.5'); // Overlap

// Stagger
gsap.to('.item', {
  duration: 1,
  y: 20,
  stagger: 0.1 // 0.1s delay between each
});
