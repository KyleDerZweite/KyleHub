'use client'

import {useEffect, useState} from 'react'
import {motion} from 'framer-motion'

const TerminalCard = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Add a small delay before animation starts
                    setTimeout(() => {
                        setIsVisible(true)
                    }, 300)
                    observer.unobserve(entry.target)
                }
            },
            // Increase threshold for more intentional triggering
            {threshold: 0.25}
        )

        const element = document.getElementById('terminal')
        if (element) observer.observe(element)

        return () => {
            if (element) observer.unobserve(element)
        }
    }, [])

    const containerVariants = {
        hidden: {opacity: 0, y: 20}, // Reduced y-movement from 50 to 20
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1.2, // Increased duration from 0.6 to 1.2
                ease: "easeInOut", // Changed to more subtle easing
                opacity: {
                    duration: 1.5 // Even slower fade-in
                }
            }
        }
    }

    return (
        <section id="terminal" className="py-24 bg-black">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="max-w-4xl mx-auto"
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    variants={containerVariants}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-500">
              Terminal Access
            </span>
                    </h2>

                    <div className="tech-card p-6 rounded-lg border border-purple-500/30 bg-black/60 backdrop-blur-sm">
                        <div className="terminal-header flex items-center mb-4">
                            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                            <span className="text-gray-400 text-sm">terminal@kylehub.dev</span>
                        </div>
                        <div className="font-mono text-green-400 space-y-2">
                            <p className="terminal-command">
                                <span className="terminal-command-symbol">$</span>
                                <span className="typing-effect">Welcome to KyleHub.dev</span>
                            </p>
                            <p className="terminal-command">
                                <span className="terminal-command-symbol">$</span>
                                <span className="typing-effect">Solving today&#39;s challenges with tomorrow&#39;s code</span>
                            </p>
                            <p className="terminal-command text-purple-300">
                                <span className="terminal-command-symbol">$</span>
                                <span className="typing-effect">Code Riddle:</span>
                            </p>
                            <pre className="bg-gray-900 p-4 rounded-md overflow-x-auto text-sm">
{`function mystery(n) {
  return n === 0 
    ? 1 
    : n * mystery(n - 1);
}

// What concept does this demonstrate?
// And what's mystery(5)?`}
              </pre>
                            <p className="text-gray-400 text-sm">
                                Hover here for answer: <span
                                className="answer-reveal">Recursion; 120 (5 factorial)</span>
                            </p>

                            <div className="mt-6 pt-4 border-t border-gray-800">
                                <p className="terminal-command">
                                    <span className="terminal-command-symbol">$</span>
                                    <span className="typing-effect">echo &#34;Here&#39;s another challenge:&#34;</span>
                                </p>
                                <pre className="bg-gray-900 p-4 rounded-md overflow-x-auto text-sm mt-2">
{`async function fetchData() {
  try {
    const response = await fetch('https://api.kylehub.dev/data');
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

// What modern JavaScript concept is being demonstrated?`}
                </pre>
                                <p className="text-gray-400 text-sm">
                                    Hover here for answer: <span className="answer-reveal">Async/Await for handling Promises</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default TerminalCard
