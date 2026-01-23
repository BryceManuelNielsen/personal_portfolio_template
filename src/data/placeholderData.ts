import type { PortfolioData } from '../types/Portfolio';

export const portfolioData: PortfolioData = {
  profile: {
    name: "Alex Developer",
    title: "Full Stack Engineer & Designer",
    tagline: "Building digital products that solve real-world problems.",
    about: [
      "I am a passionate engineer with a focus on web technologies and user experience. My background allows me to bridge the gap between complex backend logic and intuitive frontend design.",
      "I thrive on solving complex problems across software development, data science, and system architecture."
    ],
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=500&h=500",
    email: "alex@example.com",
    socialLinks: [
      { platform: "GitHub", url: "#", icon: "fab fa-github" },
      { platform: "LinkedIn", url: "#", icon: "fab fa-linkedin" },
      { platform: "Email", url: "mailto:alex@example.com", icon: "fas fa-envelope" }
    ]
  },
  skills: [
    { name: "React / Web Dev", icon: "fas fa-code" },
    { name: "Python", icon: "fab fa-python" },
    { name: "Machine Learning", icon: "fas fa-brain" },
    { name: "Database Design", icon: "fas fa-database" },
    { name: "Cloud Architecture", icon: "fas fa-cloud" },
    { name: "UI/UX Design", icon: "fas fa-pen-nib" }
  ],
  projects: [
    {
      id: "project-one",
      title: "Autonomous Logistics Robot",
      subtitle: "A fully autonomous system capable of navigating complex environments to locate and sort objects.",
      category: "Robotics / Software",
      thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
      tags: ["C++", "ROS", "Computer Vision", "3D Printing"],
      role: "Lead Engineer",
      timeline: "Winter 2024",
      repoLink: "#",
      demoLink: "#",
      overview: "Designed to address the risks associated with human-operated retrieval in hazardous environments. The core objective was to develop a mechatronic system capable of navigating a defined area to locate, collect, and sort valuable objects based on visual properties.",
      challenges: [
        "Autonomy: Operating entirely independently using onboard processing without external guides.",
        "Resource Constraints: Strict weight (<1kg) and budget limits required efficient design.",
        "Real-time Processing: Object detection and path planning needed to happen in milliseconds."
      ],
      solution: "The final design utilized a differential drive configuration for agility. We implemented a custom computer vision pipeline for object detection and a pathfinding algorithm to optimize retrieval routes.",
      solutionSteps: [
        { title: "Navigation", description: "Used SLAM for mapping and localization within the arena." },
        { title: "Object Manipulation", description: "Engineered a custom gripper arm with force feedback sensors." },
        { title: "Decision Making", description: "Implemented a state machine to handle task prioritization." }
      ],
      results: "The robot successfully retrieved 95% of objects within the time limit and won the 'Best Design' award at the regional competition.",
      stats: [
        { label: "Accuracy", value: "98%" },
        { label: "Cost", value: "<$100" }
      ],
      galleryImages: [
        { url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500", caption: "System Architecture" },
        { url: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=500", caption: "Prototype Assembly" }
      ]
    },
    {
      id: "project-two",
      title: "E-Commerce Platform",
      subtitle: "A scalable online marketplace built with modern web technologies.",
      category: "Full Stack Web",
      thumbnail: "https://images.unsplash.com/photo-1556742049-8cfed88f84cc?w=800",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      role: "Full Stack Developer",
      timeline: "Fall 2024",
      repoLink: "#",
      overview: "Created a comprehensive e-commerce solution to help small businesses go online. The platform supports inventory management, secure payments, and customer analytics.",
      solution: "Built using a MERN stack with a microservices architecture to ensure scalability. Integrated Stripe for payments and AWS S3 for media storage.",
      results: "Launched with 5 beta merchants and processed over $10k in transactions in the first month.",
      galleryImages: []
    },
    {
      id: "project-three",
      title: "Neural Network Visualizer",
      subtitle: "An educational tool to visualize how neural networks learn.",
      category: "Machine Learning / Education",
      thumbnail: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800",
      tags: ["Python", "TensorFlow", "D3.js"],
      role: "Solo Developer",
      timeline: "Summer 2024",
      repoLink: "#",
      overview: "Machine learning concepts can be abstract. This tool provides an interactive visualization of weights and biases changing during the training process.",
      solution: "Developed a Python backend to run training simulations and a D3.js frontend to render real-time updates of the network structure.",
      results: "Used by 200+ students in the university's Intro to AI course.",
      galleryImages: []
    }
  ]
};
