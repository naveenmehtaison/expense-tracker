import React from 'react'
import { useSelector } from 'react-redux'
import image from '../../Assets/image.png'
const Support = () => {
  const Theme = useSelector((state)=>state.Theme.curstate)
  return (
    <div className='bg-gray-900  h-full' style={{backgroundColor: Theme}}>
      <div className="max-w-6xl mx-auto px-4 py-12">
  {/* Hero Section */}
  <div className="text-center mb-16">
    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
      About <span className="text-teal-500">Me</span>
    </h1>
    <div className="w-24 h-1 bg-teal-500 mx-auto mb-8"></div>
    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
      Passionate developer creating solutions that bridge technology and human needs
    </p>
  </div>

  {/* Main Content */}
  <div className="grid md:grid-cols-2 gap-12 items-center">
    {/* Profile Image */}
    <div className="relative group">
      <div className="absolute -inset-2 bg-gradient-to-r from-teal-400 to-blue-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
      <div className="relative">
        <img 
          src={image}
           
          alt="Profile" 
          className="rounded-2xl  h-80 w-full shadow-xl border-4 border-white dark:border-gray-800"
        />
      </div>
    </div>

    {/* Bio Text */}
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
        My <span className="text-teal-500">Journey</span>
      </h2>
      
      <div className="space-y-4 text-gray-600 dark:text-gray-300">
        <p>
          With {new Date().getFullYear() - 2020}+ years in software development, I've cultivated expertise in full-stack JavaScript development, specializing in React, Node.js, and modern web architectures.
        </p>
        
      </div>

      {/* Skills Highlights */}
      <div className="mt-8">
        <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-4">
          Core <span className="text-teal-500">Competencies</span>
        </h3>
        <div className="flex flex-wrap gap-3">
          {['React', 'Node.js', 'TypeScript', 'AWS', 'UI/UX Design'].map((skill) => (
            <span 
              key={skill}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium text-gray-800 dark:text-gray-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>

  {/* Philosophy Section */}
  {/* <div className="mt-20 bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 md:p-12">
    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
      Development <span className="text-teal-500">Philosophy</span>
    </h2>
    
    <div className="grid md:grid-cols-3 gap-8">
      {[
        {
          icon: '💡',
          title: 'Innovation',
          desc: 'Embracing cutting-edge technologies to solve problems in novel ways'
        },
        {
          icon: '🧩',
          title: 'Modularity',
          desc: 'Building systems with clean, reusable components and patterns'
        },
        {
          icon: '🎯',
          title: 'Impact',
          desc: 'Focusing on solutions that deliver measurable value to users'
        }
      ].map((item) => (
        <div key={item.title} className="text-center">
          <div className="text-4xl mb-4">{item.icon}</div>
          <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-2">{item.title}</h3>
          <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
        </div>
      ))}
    </div>
  </div> */}
</div>
    </div>
  )
}

export default Support