import Link from 'next/link'
import { FiGithub, FiInstagram } from 'react-icons/fi'
import { FaDiscord } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer className="py-6 border-t border-purple-500/30 mt-auto">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/">
                            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-500">
                                <span className="text-white">Kyle</span>Hub
                                <span className="text-cyberpunk-accent">.</span>
                            </div>
                        </Link>
                        <p className="mt-4 text-gray-400 max-w-md">
                            A modern, state-of-the-art website with steampunk and cyberpunk aesthetics.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-white font-medium mb-4 text-lg">Navigation</h3>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-medium mb-4 text-lg">Connect</h3>
                        <div className="flex space-x-6">
                            <a href="https://github.com/KyleDerZweite" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                <FiGithub className="h-6 w-6" />
                                <span className="sr-only">GitHub</span>
                            </a>
                            <a href="https://instagram.com/kylehub.dev" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                <FiInstagram className="h-6 w-6" />
                                <span className="sr-only">Instagram</span>
                            </a>
                            <a href="https://discord.gg/2tVKEvn7kK" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                <FaDiscord className="h-6 w-6" />
                                <span className="sr-only">Discord</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-purple-500/30 text-center text-gray-500">
                    <p>© 2025 KyleHub. All rights reserved</p>
                    <div className="mt-4 flex justify-center space-x-6">
                        <a href="https://github.com/KyleDerZweite" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">GitHub</a>
                        <a href="https://discord.gg/2tVKEvn7kK" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">Discord</a>
                        <a href="https://instagram.com/kylehub.dev" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">Instagram</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer