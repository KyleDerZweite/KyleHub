'use client'

import {useEffect, useState} from 'react'
import {motion} from 'framer-motion'
import {FiGithub, FiStar, FiGitBranch, FiCode, FiClock} from 'react-icons/fi'

// Define types for the data we'll fetch
type LanguageStats = {
    [key: string]: number
}

type RepoStats = {
    name: string
    description: string
    stars: number
    forks: number
    languages: LanguageStats
    totalBytes: number
    updatedAt: string
}

// Color mapping for common languages
const languageColors: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f7df1e',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Python: '#3572A5',
    Java: '#b07219',
    PHP: '#4F5D95',
    Ruby: '#701516',
    Go: '#00ADD8',
    Rust: '#dea584',
    // Add more languages as needed
    Default: '#6e6e6e'
}

const GitHubStats = () => {
    const [stats, setStats] = useState<RepoStats | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchRepoStats = async () => {
            try {
                setLoading(true)

                // Use our server-side API route instead of directly calling GitHub
                const response = await fetch('/api/github-stats')
                if (!response.ok) throw new Error('Failed to fetch repository data')

                const data = await response.json()
                setStats(data)
            } catch (err) {
                console.error('Error fetching GitHub stats:', err)
                setError('Failed to load GitHub repository stats')
            } finally {
                setLoading(false)
            }
        }

        fetchRepoStats()
    }, [])

    // Rest of component remains the same...
    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="tech-loader"></div>
            </div>
        )
    }

    if (error || !stats) {
        return (
            <div className="text-center py-20">
                <p className="text-red-500">{error || 'Something went wrong'}</p>
            </div>
        )
    }

    return (
        <section id="github-stats" className="py-24 bg-gradient-to-b from-cyberpunk-dark to-black">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.8}}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-500">
              Repository Stats
            </span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto flex items-center justify-center">
                        <FiGithub className="mr-2"/>
                        github.com/KyleDerZweite/KyleHub
                    </p>
                </motion.div>

                <motion.div
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.8, delay: 0.2}}
                    className="tech-card p-6 rounded-lg border border-purple-500/30 bg-black/60 backdrop-blur-sm max-w-4xl mx-auto"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-medium text-white mb-4">{stats.name}</h3>
                            <p className="text-gray-400 mb-6">{stats.description}</p>

                            <div className="flex items-center space-x-6 mb-6">
                                <div className="flex items-center">
                                    <FiStar className="text-yellow-400 mr-2"/>
                                    <span className="text-gray-300">{stats.stars} stars</span>
                                </div>
                                <div className="flex items-center">
                                    <FiGitBranch className="text-gray-400 mr-2"/>
                                    <span className="text-gray-300">{stats.forks} forks</span>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h4 className="text-lg font-medium text-white mb-3 flex items-center">
                                    <FiCode className="mr-2"/> Language Distribution
                                </h4>

                                {Object.entries(stats.languages).map(([lang, bytes]) => {
                                    const percentage = ((bytes / stats.totalBytes) * 100).toFixed(1)
                                    return (
                                        <div key={lang} className="mb-3">
                                            <div className="flex justify-between mb-1">
                                                <span className="text-gray-300">{lang}</span>
                                                <span className="text-gray-400">{percentage}%</span>
                                            </div>
                                            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{width: 0}}
                                                    animate={{width: `${percentage}%`}}
                                                    transition={{duration: 1, delay: 0.5}}
                                                    className="h-full rounded-full"
                                                    style={{
                                                        backgroundColor: languageColors[lang] || languageColors.Default,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            {/* Show when data was last updated */}
                            <div className="text-sm text-gray-500 flex items-center mt-4">
                                <FiClock className="mr-1"/>
                                Last updated: {new Date(stats.updatedAt).toLocaleString()}
                            </div>
                        </div>

                        <div>
                            <div className="h-full flex items-center justify-center">
                                <div className="relative w-full aspect-square max-w-xs">
                                    <svg viewBox="0 0 100 100" className="w-full h-full">
                                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1e1e1e"
                                                strokeWidth="10"/>

                                        {/* Create pie chart segments for languages */}
                                        {(() => {
                                            let startAngle = 0
                                            return Object.entries(stats.languages).map(([lang, bytes]) => {
                                                const percentage = (bytes / stats.totalBytes)
                                                const angle = percentage * 360
                                                const endAngle = startAngle + angle

                                                // SVG arc path calculation
                                                const x1 = 50 + 40 * Math.cos(Math.PI * startAngle / 180)
                                                const y1 = 50 + 40 * Math.sin(Math.PI * startAngle / 180)
                                                const x2 = 50 + 40 * Math.cos(Math.PI * endAngle / 180)
                                                const y2 = 50 + 40 * Math.sin(Math.PI * endAngle / 180)

                                                const largeArcFlag = angle > 180 ? 1 : 0

                                                const pathData = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`

                                                const element = (
                                                    <motion.path
                                                        key={lang}
                                                        d={pathData}
                                                        fill={languageColors[lang] || languageColors.Default}
                                                        initial={{opacity: 0}}
                                                        animate={{opacity: 1}}
                                                        transition={{duration: 0.5, delay: 0.8}}
                                                    >
                                                        <title>{lang}: {(percentage * 100).toFixed(1)}%</title>
                                                    </motion.path>
                                                )

                                                startAngle = endAngle
                                                return element
                                            })
                                        })()}

                                        {/* Inner circle for better aesthetics */}
                                        <circle cx="50" cy="50" r="20" fill="#000" stroke="#2a2a2a" strokeWidth="1"/>
                                    </svg>
                                </div>
                            </div>

                            <div className="mt-8 grid grid-cols-2 gap-2">
                                {Object.entries(stats.languages).map(([lang]) => (
                                    <div key={lang} className="flex items-center text-sm">
                                        <div
                                            className="w-3 h-3 mr-2 rounded-full"
                                            style={{backgroundColor: languageColors[lang] || languageColors.Default}}
                                        ></div>
                                        <span className="text-gray-300">{lang}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-800">
                        <a
                            href="https://github.com/KyleDerZweite/KyleHub"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-400 hover:text-primary-300 transition-colors flex items-center"
                        >
                            <FiGithub className="mr-2"/> View on GitHub
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default GitHubStats