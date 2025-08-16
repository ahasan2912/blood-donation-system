import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaSearch, FaCalendarAlt, FaUser, FaArrowRight, FaTags } from 'react-icons/fa'
import PageWrapper from '../../components/blogs/PageWrapper'
import BlogPostCard from '../../components/blogs/BlogPostCard'
import NewsLetter from '../../components/blogs/NewsLetter'
import BlogBanner from '../../components/blogs/BlogBanner'

const Blogs = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')

    const blogCategories = ['All', 'Health Tips', 'Donation Process', 'Medical Research', 'Success Stories', 'Community']

    const blogPosts = [
        {
            id: 1,
            title: "The Health Benefits of Regular Blood Donation",
            excerpt: "Discover how donating blood regularly can improve your health and wellbeing, from reducing iron levels to improving heart health.",
            category: "Health Tips",
            author: "Dr. Sarah Johnson",
            date: "May 15, 2025",
            readTime: "6 min read",
            image: "https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        },
        {
            id: 2,
            title: "Understanding Different Blood Types and Compatibility",
            excerpt: "Learn about the ABO blood group system, Rh factors, and why blood type compatibility matters for transfusions and donations.",
            category: "Medical Research",
            author: "Dr. Michael Chen",
            date: "May 10, 2025",
            readTime: "8 min read",
            image: "https://images.pexels.com/photos/6823612/pexels-photo-6823612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        },
        {
            id: 3,
            title: "What to Expect During Your First Blood Donation",
            excerpt: "A step-by-step guide to the blood donation process, from registration to recovery, to help first-time donors feel prepared and comfortable.",
            category: "Donation Process",
            author: "Emily Rodriguez",
            date: "May 5, 2025",
            readTime: "5 min read",
            image: "https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        },
        {
            id: 4,
            title: "How John's Donation Saved Three Lives in One Day",
            excerpt: "The inspiring story of how one donor's contribution was used to help multiple patients in critical condition after a major accident.",
            category: "Success Stories",
            author: "Jessica Thomson",
            date: "April 28, 2025",
            readTime: "4 min read",
            image: "https://images.pexels.com/photos/4226896/pexels-photo-4226896.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        },
        {
            id: 5,
            title: "Blood Donation Myths Debunked",
            excerpt: "Addressing common misconceptions about blood donation that prevent people from becoming donors and the truth behind these myths.",
            category: "Community",
            author: "Dr. Sarah Johnson",
            date: "April 20, 2025",
            readTime: "7 min read",
            image: "https://images.pexels.com/photos/4226269/pexels-photo-4226269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        },
        {
            id: 6,
            title: "Nutrition Tips for Before and After Blood Donation",
            excerpt: "Dietary recommendations to prepare your body for blood donation and to help you recover quickly afterward.",
            category: "Health Tips",
            author: "Nutritionist Amanda Lee",
            date: "April 15, 2025",
            readTime: "6 min read",
            image: "https://images.pexels.com/photos/4226896/pexels-photo-4226896.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        }
    ]

    const filteredPosts = blogPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    })

    return (
        <PageWrapper>
            <BlogBanner
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            {/* Categories */}
            <section className="py-8 bg-gray-50 border-b border-gray-200">
                <div className="container-custom">
                    <div className="flex flex-wrap justify-center gap-3">
                        {blogCategories.map((category, index) => (
                            <motion.button
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category
                                    ? 'bg-red-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {category}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Posts */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    {filteredPosts.length === 0 ? (
                        <div className="text-center py-16">
                            <h3 className="text-2xl font-semibold text-gray-700 mb-4">No results found</h3>
                            <p className="text-gray-600">Try adjusting your search or category filters</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPosts.map((post, index) => <BlogPostCard key={post.id}
                                post={post}
                                index={index}
                            />)}
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter */}
            <NewsLetter />
        </PageWrapper>
    )
}

export default Blogs