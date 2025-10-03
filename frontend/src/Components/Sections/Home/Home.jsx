// import { useEffect, useState } from 'react';
// import wolf from '/assets/1.webp';


// function Home() {
//   // const [data, setData] = useState([])
//   // const tempData = [{
//   //     name: 'bluemooooooon',
//   //     mail: 'blue@gmail.com',
//   //     img: 'url',
//   //     title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
//   //     content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores quo sit fuga consequuntur atque velit omnis magnam perferendis consectetur, aut in temporibus cum illum dolorem illo fugiat, possimus quam blanditiis. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo natus, placeat itaque repellendus architecto soluta unde voluptatibus tenetur sed veniam ipsam quidem autem praesentium, quaerat cumque saepe molestias eaque reiciendis!',
//   //     publishedAt: '20/10/2025',
//   //     name: "sna,sjfoeh"
//   //   }]

//   return (
//     <section className='sm:px-15 px-5 sm:py-8 select-none'>
//       <div className="header border-b-2 pb-5 border-b-amber-700">
//         <p className='text-black/60 text-md'>Lorem ipsum dolor !</p>
//         <h1 className='text-4xl py-4'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo illum architecto nulla fuga alias, eum adipisci.</h1>
//         <p className='text-lg text-black/70'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi soluta totam id pariatur esse non corporis consectetur eligendi magnam, quae commodi fuga doloremque adipisci placeat animi ab, quam assumenda fugiat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti nam molestiae esse repellendus aliquam? Ipsam veritatis commodi esse recusandae neque minima animi. Aliquam, quibusdam blanditiis voluptas delectus tenetur nostrum culpa.</p>
//       </div>

//       <div className="body">
//         <div className="1 px-10 my-10 shadow-[0 -5 10px black/80] lg:items-start flex gap-16 items-center flex-col lg:flex lg:flex-row relative shadow-xl py-8 pb-16 cursor-pointer">
//           <div className="img lg:w-[400px] min-w-[200px]">
//           <img src={wolf} alt="" className='w-full rounded-2xl object-cover' />
//           </div>
//           <div className="content leading-9 w-full">
//             <div className="profile flex items-center text-xl gap-2">
//               <img src={wolf} alt="" width="40px" className='rounded-full' />
//                 <h1 className='flex flex-col'>Bluemoon<span className='text-sm text-black/70'>Bluemoon@gmail.com</span></h1>
                
//             </div>
//             <h1 className='text-3xl font-bold py-5'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h1>
//             <p className='text-black/70'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores quo sit fuga consequuntur atque velit omnis magnam perferendis consectetur, aut in temporibus cum illum dolorem illo fugiat, possimus quam blanditiis. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo natus, placeat itaque repellendus architecto soluta unde voluptatibus tenetur sed veniam ipsam quidem autem praesentium, quaerat cumque saepe molestias eaque reiciendis!</p>
//           </div> 
//           <div className="timestamp absolute bottom-6 right-5  text-black/60 text-md">
//             <p>Published At <span>10/09/2025</span></p>
//           </div>
//         </div>
//         <div className="1 px-10 my-10 shadow-[0 -5 10px black/80] lg:items-start flex gap-16 items-center flex-col lg:flex lg:flex-row relative shadow-xl py-8 pb-16 cursor-pointer">
//           <div className="img lg:w-[400px] min-w-[200px]">
//           <img src={wolf} alt="" className='w-full rounded-2xl object-cover' />
//           </div>
//           <div className="content leading-9 w-full">
//             <div className="profile flex items-center text-xl gap-2">
//               <img src={wolf} alt="" width="40px" className='rounded-full' />
//                 <h1 className='flex flex-col'>Bluemoon<span className='text-sm text-black/70'>Bluemoon@gmail.com</span></h1>
                
//             </div>
//             <h1 className='text-3xl font-bold py-5'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h1>
//             <p className='text-black/70'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores quo sit fuga consequuntur atque velit omnis magnam perferendis consectetur, aut in temporibus cum illum dolorem illo fugiat, possimus quam blanditiis. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo natus, placeat itaque repellendus architecto soluta unde voluptatibus tenetur sed veniam ipsam quidem autem praesentium, quaerat cumque saepe molestias eaque reiciendis!</p>
//           </div> 
//           <div className="timestamp absolute bottom-6 right-5  text-black/60 text-md">
//             <p>Published At <span>10/09/2025</span></p>
//           </div>
//         </div>
//         <div className="1 px-10 my-10 shadow-[0 -5 10px black/80] lg:items-start flex gap-16 items-center flex-col lg:flex lg:flex-row relative shadow-xl py-8 pb-16 cursor-pointer">
//           <div className="img lg:w-[400px] min-w-[200px]">
//           <img src={wolf} alt="" className='w-full rounded-2xl object-cover' />
//           </div>
//           <div className="content leading-9 w-full">
//             <div className="profile flex items-center text-xl gap-2">
//               <img src={wolf} alt="" width="40px" className='rounded-full' />
//                 <h1 className='flex flex-col'>Bluemoon<span className='text-sm text-black/70'>Bluemoon@gmail.com</span></h1>
                
//             </div>
//             <h1 className='text-3xl font-bold py-5'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h1>
//             <p className='text-black/70'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores quo sit fuga consequuntur atque velit omnis magnam perferendis consectetur, aut in temporibus cum illum dolorem illo fugiat, possimus quam blanditiis. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo natus, placeat itaque repellendus architecto soluta unde voluptatibus tenetur sed veniam ipsam quidem autem praesentium, quaerat cumque saepe molestias eaque reiciendis!</p>
//           </div> 
//           <div className="timestamp absolute bottom-6 right-5  text-black/60 text-md">
//             <p>Published At <span>10/09/2025</span></p>
//           </div>
//         </div>
//         {/* <div className="1 px-10 my-10  shadow-[0 -5 10px black/80] lg:items-start sm:flex sm:gap-20 sm:items-center sm:flex-col lg:flex lg:flex-row relative shadow-xl py-8 pb-16 ">
//           <div className="img lg:w-[30%] sm:w-full">
//           <img src={wolf} alt="" className='w-full rounded-2xl object-cover' />
//           </div>
//           <div className="content leading-9 w-[50%] sm:w-full">
//             <div className="profile flex items-center text-xl gap-2">
//               <img src={wolf} alt="" width="40px" className='rounded-full' />
//               <h1 className='flex flex-col'>Bluemoon <span className='text-sm text-black/70'>Bluemoon@gmail.com</span></h1>
//             </div>
//             <h1 className='text-3xl font-bold py-5'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h1>
//             <p className='text-black/70'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores quo sit fuga consequuntur atque velit omnis magnam perferendis consectetur, aut in temporibus cum illum dolorem illo fugiat, possimus quam blanditiis. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo natus, placeat itaque repellendus architecto soluta unde voluptatibus tenetur sed veniam ipsam quidem autem praesentium, quaerat cumque saepe molestias eaque reiciendis!</p>
//           </div> 
//           <div className="timestamp absolute bottom-6 right-5  text-black/60 text-md">
//             <p>Published At <span>10/09/2025</span></p>
//           </div>
//         </div> */}

//       </div>
//     </section>
//   )
// }

// export default Home

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Calendar, 
  User, 
  ArrowRight, 
  Mail,
  BookOpen,
  TrendingUp
} from 'lucide-react';

const Homepage = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log('Subscribed with:', email);
    setEmail('');
  };

  const articles = [
    {
      id: 1,
      title: "Maya Louvière on IPOs, The No Code Movement & Offending People With The Future",
      excerpt: "Turns out, predicting the future can afford people, even if it turn. In 2018, we interviewed Maya Stefmann who predicted 'tunning to code will eventually be as useful as learning behind Greek' today, learning to code is being over-permeable as a safer tactile for long-term career success. We created to her about her 2030 prediction.",
      author: "Anette Laurent",
      date: "19 Jan 2004",
      category: "Interviews",
      readTime: "8 min read",
      authorInitials: "AL"
    },
    {
      id: 2,
      title: "Cognitive Dissonance Theory: Crash Course for UX Designers",
      excerpt: "We all like to think of ourselves in certain ways. We consider ourselves to be truthful, hard working, health-conscious, and in our own lives.",
      author: "Alex Willem",
      date: "17 Jan 2004",
      category: "UX Design",
      readTime: "5 min read",
      authorInitials: "AW"
    }
  ];

  const featuredTopics = [
    "Design Systems",
    "UX Research",
    "Product Design",
    "Design Leadership",
    "No Code",
    "UI Patterns"
  ];

  return (
    <div className="min-h-screen bg-white mt-20">
      {/* Header */}
      <header className="border-b border-gray-100 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-3">
                Inside Design
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl">
                Stories and Interviews
              </p>
            </div>
            
            <div className="w-full md:w-auto">
              <div className="bg-gray-50 rounded-xl p-6 max-w-md">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-600" />
                  Subscribe to our newsletter
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Get the latest design trends, software releases, and exclusive interviews with design leaders.
                </p>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white"
                    required
                  />
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Topics */}
      <section className="border-b border-gray-100 py-6">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-wrap gap-2 justify-center">
            {featuredTopics.map((topic, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="px-3 py-1 text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors"
              >
                {topic}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-12">
            {articles.map((article) => (
              <article key={article.id} className="group">
                <Card className="border-0 shadow-none hover:bg-gray-50 transition-colors duration-300 rounded-xl">
                  <CardHeader className="pb-4">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                        {article.category}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                      {article.title}
                    </h2>
                  </CardHeader>
                  
                  <CardContent className="pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </CardContent>
                  
                  <CardFooter className="pt-4 border-t border-gray-100 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-gray-200 text-gray-700">
                          {article.authorInitials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">{article.author}</p>
                        <p className="text-sm text-gray-500">{article.date}</p>
                      </div>
                    </div>
                    <Button variant="ghost" className="group/btn text-gray-600 hover:text-blue-600">
                      Read more
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </CardFooter>
                </Card>
              </article>
            ))}
          </div>
        </div>
      </main>

      {/* Newsletter CTA */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <TrendingUp className="h-12 w-12 mx-auto mb-6 text-blue-400" />
          <h2 className="text-3xl font-bold mb-4">Stay Updated with Design Trends</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Subscribe for the latest design trends, design software and releases, and exclusive interviews with design leaders.
          </p>
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white text-gray-900"
                required
              />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-8 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-gray-900">Inside Design</h3>
              <p className="text-gray-600">Stories and Interviews</p>
            </div>
            <div className="text-gray-600 text-sm">
              © 2024 Inside Design. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;