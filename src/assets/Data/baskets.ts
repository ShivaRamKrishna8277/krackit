// baskets.ts
export interface Question {
  question: string;
  answer: string;
  status: 'completed' | 'pending';
}
export interface Timing {
  status: 'completed' | 'pending';
  questions: Question[];
}
export interface DailySchedule {
  status: 'completed' | 'pending';
  timings: {
    [key: string]: Timing;
  };
}
export interface Basket {
  basketID: number;
  basketTitle: string;
  startDate: string;
  endDate: string;
  status: 'completed' | 'pending';
  questionsDaily: number;
  progress: number;
  schedule: {
    time: string;
    questionsCount: number;
  }[];
  questionsSchedule: {
    [key: string]: DailySchedule;
  };
}

const baskets: Basket[] = [
  {
    basketID: 1,
    basketTitle: "Algebra Basics",
    startDate: "01-10-2024",
    endDate: "31-10-2024",
    status: "pending",
    questionsDaily: 10,
    progress: 26,
    schedule: [
      { time: "10:00", questionsCount: 5 },
      { time: "18:00", questionsCount: 5 },
    ],
    questionsSchedule: {
      day1: {
        status: "completed",
        timings: {
          "10:00": {
            status: "completed",
            questions: [
              { question: "What is AI?", answer: "AI is the simulation of human intelligence in machines.", status: "completed" },
              { question: "What is machine learning?", answer: "Machine learning is a subset of AI that focuses on data-driven learning.", status: "completed" },
              { question: "What is deep learning?", answer: "Deep learning is a subset of machine learning that uses neural networks.", status: "completed" },
              { question: "What is reinforcement learning?", answer: "Reinforcement learning is learning based on rewards and punishments.", status: "completed" },
              { question: "What are neural networks?", answer: "Neural networks are models inspired by the human brain for AI tasks.", status: "completed" },
            ],
          },
          "18:00": {
            status: "pending",
            questions: [
              { question: "What is a chatbot?", answer: "A chatbot is an AI application that simulates human conversation.", status: "pending" },
              { question: "What is a recommendation system?", answer: "A recommendation system suggests products, services, or content to users based on data.", status: "pending" },
              { question: "What is the Turing test?", answer: "The Turing test evaluates a machine's ability to exhibit intelligent behavior indistinguishable from a human.", status: "pending" },
              { question: "What are expert systems?", answer: "Expert systems are AI programs that emulate the decision-making ability of a human expert.", status: "pending" },
              { question: "What is data mining?", answer: "Data mining involves discovering patterns and knowledge from large amounts of data.", status: "pending" },
            ],
          },
        },
      },
      day2: {
        status: "pending",
        timings: {
          "10:00": {
            status: "pending",
            questions: [
              { question: "What is cloud computing?", answer: "Cloud computing is the delivery of computing services over the internet.", status: "pending" },
              { question: "What is big data?", answer: "Big data refers to extremely large datasets that may be analyzed to reveal patterns and trends.", status: "pending" },
              { question: "What is IoT?", answer: "The Internet of Things (IoT) refers to the interconnectedness of devices via the internet.", status: "pending" },
              { question: "What is blockchain?", answer: "Blockchain is a decentralized digital ledger used for secure transactions.", status: "pending" },
              { question: "What is cybersecurity?", answer: "Cybersecurity involves protecting systems, networks, and programs from digital attacks.", status: "pending" },
            ],
          },
          "18:00": {
            status: "pending",
            questions: [
              { question: "What is DevOps?", answer: "DevOps is a set of practices that combines software development and IT operations.", status: "pending" },
              { question: "What is agile methodology?", answer: "Agile is a project management methodology that focuses on iterative development.", status: "pending" },
              { question: "What is digital transformation?", answer: "Digital transformation is the integration of digital technology into all areas of business.", status: "pending" },
              { question: "What is AI bias?", answer: "AI bias refers to algorithms that produce prejudiced results due to incorrect assumptions.", status: "pending" },
              { question: "What is robotic process automation?", answer: "Robotic process automation (RPA) is the use of software robots to automate repetitive tasks.", status: "pending" },
            ],
          },
        },
      },
    },
  },
  {
    basketID: 2,
    basketTitle: "Web Development Essentials",
    startDate: "01-11-2024",
    endDate: "30-11-2024",
    status: "completed",
    questionsDaily: 8,
    progress: 52,
    schedule: [
      { time: "09:00", questionsCount: 3 },
      { time: "15:00", questionsCount: 5 },
    ],
    questionsSchedule: {
      day1: {
        status: "completed",
        timings: {
          "09:00": {
            status: "completed",
            questions: [
              { question: "What is HTML?", answer: "HTML stands for HyperText Markup Language and is used for creating webpages.", status: "completed" },
              { question: "What is CSS?", answer: "CSS stands for Cascading Style Sheets and is used for styling HTML elements.", status: "completed" },
              { question: "What is JavaScript?", answer: "JavaScript is a programming language used to make webpages interactive.", status: "completed" },
            ],
          },
          "15:00": {
            status: "completed",
            questions: [
              { question: "What is a CSS framework?", answer: "A CSS framework provides pre-written CSS code to help build websites faster.", status: "completed" },
              { question: "What is responsive design?", answer: "Responsive design ensures that webpages look good on all devices.", status: "completed" },
              { question: "What is the DOM?", answer: "The DOM (Document Object Model) is a programming interface for HTML and XML documents.", status: "completed" },
              { question: "What is a JavaScript library?", answer: "A JavaScript library is a collection of pre-written JavaScript code that simplifies coding tasks.", status: "completed" },
              { question: "What is AJAX?", answer: "AJAX (Asynchronous JavaScript and XML) allows for updating parts of a webpage without reloading the whole page.", status: "completed" },
            ],
          },
        },
      },
      day2: {
        status: "pending",
        timings: {
          "09:00": {
            status: "pending",
            questions: [
              { question: "What is jQuery?", answer: "jQuery is a fast, small, and feature-rich JavaScript library.", status: "pending" },
              { question: "What are web APIs?", answer: "Web APIs are interfaces for interacting with web services.", status: "pending" },
              { question: "What is SEO?", answer: "SEO (Search Engine Optimization) is the practice of improving the ranking of a website on search engines.", status: "pending" },
            ],
          },
          "15:00": {
            status: "pending",
            questions: [
              { question: "What is a single-page application?", answer: "A single-page application is a web app that loads a single HTML page and dynamically updates it.", status: "pending" },
              { question: "What is a server?", answer: "A server is a computer system that provides data to other computers over a network.", status: "pending" },
              { question: "What is a REST API?", answer: "A REST API is an application programming interface that adheres to the principles of REST (Representational State Transfer).", status: "pending" },
              { question: "What is a web server?", answer: "A web server is a server that stores, processes, and delivers web pages to clients.", status: "pending" },
              { question: "What is client-side rendering?", answer: "Client-side rendering is the process of rendering web pages in the browser using JavaScript.", status: "pending" },
            ],
          },
        },
      },
    },
  },
  {
    basketID: 3,
    basketTitle: "Data Science Fundamentals",
    startDate: "01-12-2024",
    endDate: "31-12-2024",
    status: "pending",
    questionsDaily: 6,
    progress: 86,
    schedule: [
      { time: "11:00", questionsCount: 3 },
      { time: "19:00", questionsCount: 3 },
    ],
    questionsSchedule: {
      day1: {
        status: "completed",
        timings: {
          "11:00": {
            status: "completed",
            questions: [
              { question: "What is data science?", answer: "Data science is the field that uses scientific methods to extract insights from data.", status: "completed" },
              { question: "What is a dataset?", answer: "A dataset is a collection of data, often organized in a table format.", status: "completed" },
              { question: "What is data cleaning?", answer: "Data cleaning is the process of identifying and correcting errors in datasets.", status: "completed" },
            ],
          },
          "19:00": {
            status: "completed",
            questions: [
              { question: "What is a data analyst?", answer: "A data analyst is a professional who analyzes and interprets complex data sets.", status: "completed" },
              { question: "What is machine learning?", answer: "Machine learning is a branch of AI that involves training algorithms to make predictions.", status: "completed" },
              { question: "What is a statistical model?", answer: "A statistical model is a mathematical representation of observed data.", status: "completed" },
            ],
          },
        },
      },
      day2: {
        status: "pending",
        timings: {
          "11:00": {
            status: "pending",
            questions: [
              { question: "What is regression analysis?", answer: "Regression analysis is a statistical method for estimating the relationships among variables.", status: "pending" },
              { question: "What is clustering?", answer: "Clustering is the task of grouping a set of objects in such a way that objects in the same group are more similar to each other than to those in other groups.", status: "pending" },
              { question: "What is data visualization?", answer: "Data visualization is the representation of data in graphical format.", status: "pending" },
            ],
          },
          "19:00": {
            status: "pending",
            questions: [
              { question: "What is Python?", answer: "Python is a high-level programming language used for data analysis and web development.", status: "pending" },
              { question: "What is R?", answer: "R is a programming language and free software environment used for statistical computing and graphics.", status: "pending" },
              { question: "What is SQL?", answer: "SQL (Structured Query Language) is a standard programming language for managing relational databases.", status: "pending" },
            ],
          },
        },
      },
    },
  },
  {
    basketID: 4,
    basketTitle: "Mobile App Development",
    startDate: "01-01-2025",
    endDate: "31-01-2025",
    status: "pending",
    questionsDaily: 4,
    progress: 18,
    schedule: [
      { time: "08:00", questionsCount: 2 },
      { time: "20:00", questionsCount: 2 },
    ],
    questionsSchedule: {
      day1: {
        status: "completed",
        timings: {
          "08:00": {
            status: "completed",
            questions: [
              { question: "What is React Native?", answer: "React Native is a framework for building mobile apps using React.", status: "completed" },
              { question: "What is Flutter?", answer: "Flutter is an open-source UI software development toolkit for building natively compiled applications.", status: "completed" },
            ],
          },
          "20:00": {
            status: "completed",
            questions: [
              { question: "What is mobile UX?", answer: "Mobile UX refers to the user experience specifically for mobile applications.", status: "completed" },
              { question: "What is mobile UI?", answer: "Mobile UI refers to the user interface design specific to mobile applications.", status: "completed" },
            ],
          },
        },
      },
      day2: {
        status: "pending",
        timings: {
          "08:00": {
            status: "pending",
            questions: [
              { question: "What is an emulator?", answer: "An emulator is software that allows one computer system to behave like another.", status: "pending" },
              { question: "What is the Google Play Store?", answer: "The Google Play Store is a digital distribution service for Android apps.", status: "pending" },
            ],
          },
          "20:00": {
            status: "pending",
            questions: [
              { question: "What is API?", answer: "API (Application Programming Interface) allows different software applications to communicate with each other.", status: "pending" },
              { question: "What is an SDK?", answer: "An SDK (Software Development Kit) is a collection of software tools for building applications.", status: "pending" },
            ],
          },
        },
      },
    },
  },
  {
    basketID: 5,
    basketTitle: "Artificial Intelligence Concepts",
    startDate: "01-02-2025",
    endDate: "28-02-2025",
    status: "completed",
    questionsDaily: 5,
    progress: 91,
    schedule: [
      { time: "12:00", questionsCount: 3 },
      { time: "21:00", questionsCount: 2 },
    ],
    questionsSchedule: {
      day1: {
        status: "completed",
        timings: {
          "12:00": {
            status: "completed",
            questions: [
              { question: "What is AI?", answer: "AI (Artificial Intelligence) refers to the simulation of human intelligence in machines.", status: "completed" },
              { question: "What is natural language processing?", answer: "Natural Language Processing (NLP) is a field of AI that enables machines to understand human language.", status: "completed" },
              { question: "What is computer vision?", answer: "Computer vision is a field of AI that trains computers to interpret and understand the visual world.", status: "completed" },
            ],
          },
          "21:00": {
            status: "completed",
            questions: [
              { question: "What is a neural network?", answer: "A neural network is a series of algorithms that attempt to recognize underlying relationships in a set of data.", status: "completed" },
              { question: "What is deep learning?", answer: "Deep learning is a subset of machine learning that uses neural networks with many layers.", status: "completed" },
            ],
          },
        },
      },
      day2: {
        status: "pending",
        timings: {
          "12:00": {
            status: "pending",
            questions: [
              { question: "What is reinforcement learning?", answer: "Reinforcement learning is an area of machine learning concerned with how agents should take actions in an environment to maximize cumulative reward.", status: "pending" },
              { question: "What is supervised learning?", answer: "Supervised learning is a type of machine learning where an algorithm is trained on labeled data.", status: "pending" },
              { question: "What is unsupervised learning?", answer: "Unsupervised learning is a type of machine learning where an algorithm is trained on unlabeled data.", status: "pending" },
            ],
          },
          "21:00": {
            status: "pending",
            questions: [
              { question: "What is a generative adversarial network?", answer: "A GAN is a class of machine learning frameworks designed by Ian Goodfellow and others.", status: "pending" },
              { question: "What is a convolutional neural network?", answer: "CNNs are a class of deep neural networks primarily used for analyzing visual imagery.", status: "pending" },
            ],
          },
        },
      },
    },
  },
];
export default baskets;