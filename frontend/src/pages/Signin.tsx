import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from '@/components/Quote'
import { Auth } from '@/components/Auth'

export default function Signup() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Form submitted:', { username, email, password })
  }

  return <div className='grid grid-cols-1 lg:grid-cols-2'>
    <div>
    <Auth type='signin' />
    </div>
    <div className='hidden lg:block'>
    <Quote />
    </div>
  </div> 
    {/* <div className="min-h-screen bg-white flex items-center justify-center p-4">
       <Card className="w-full max-w-4xl h-80vh">
        <CardContent className="p-0">
          <div className="grid md:grid-cols-2">
            <div className="p-6 md:p-8">
              <h1 className="text-2xl font-bold mb-6">Create an account</h1>
              <p className="text-sm text-gray-500 mb-6">
                Already have an account? <a href="#" className="text-blue-600 hover:underline">Login</a>
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e:any) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e:any) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e:any) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">Sign Up</Button>
              </form>
            </div>
            <div className="bg-gray-100 p-6 md:p-8 flex items-center">
              <div>
                <blockquote className="text-lg font-medium mb-2">
                  "The customer service I received was exceptional. The support team went above and beyond to address my concerns."
                </blockquote>
                <cite className="text-sm text-gray-600">
                  Jules Winnfield<br />
                  CEO, Acme Inc
                </cite>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div> */}
}