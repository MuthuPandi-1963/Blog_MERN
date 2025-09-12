import { useEffect, useState } from 'react';
import wolf from '/assets/1.webp';


function Home() {
  // const [data, setData] = useState([])
  // const tempData = [{
  //     name: 'bluemooooooon',
  //     mail: 'blue@gmail.com',
  //     img: 'url',
  //     title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
  //     content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores quo sit fuga consequuntur atque velit omnis magnam perferendis consectetur, aut in temporibus cum illum dolorem illo fugiat, possimus quam blanditiis. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo natus, placeat itaque repellendus architecto soluta unde voluptatibus tenetur sed veniam ipsam quidem autem praesentium, quaerat cumque saepe molestias eaque reiciendis!',
  //     publishedAt: '20/10/2025',
  //     name: "sna,sjfoeh"
  //   }]

  return (
    <section className='sm:px-15 px-5 sm:py-8 select-none'>
      <div className="header border-b-2 pb-5 border-b-amber-700">
        <p className='text-black/60 text-md'>Lorem ipsum dolor !</p>
        <h1 className='text-4xl py-4'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo illum architecto nulla fuga alias, eum adipisci.</h1>
        <p className='text-lg text-black/70'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi soluta totam id pariatur esse non corporis consectetur eligendi magnam, quae commodi fuga doloremque adipisci placeat animi ab, quam assumenda fugiat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti nam molestiae esse repellendus aliquam? Ipsam veritatis commodi esse recusandae neque minima animi. Aliquam, quibusdam blanditiis voluptas delectus tenetur nostrum culpa.</p>
      </div>

      <div className="body">
        <div className="1 px-10 my-10 shadow-[0 -5 10px black/80] lg:items-start flex gap-16 items-center flex-col lg:flex lg:flex-row relative shadow-xl py-8 pb-16 cursor-pointer">
          <div className="img lg:w-[400px] min-w-[200px]">
          <img src={wolf} alt="" className='w-full rounded-2xl object-cover' />
          </div>
          <div className="content leading-9 w-full">
            <div className="profile flex items-center text-xl gap-2">
              <img src={wolf} alt="" width="40px" className='rounded-full' />
                <h1 className='flex flex-col'>Bluemoon<span className='text-sm text-black/70'>Bluemoon@gmail.com</span></h1>
                
            </div>
            <h1 className='text-3xl font-bold py-5'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h1>
            <p className='text-black/70'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores quo sit fuga consequuntur atque velit omnis magnam perferendis consectetur, aut in temporibus cum illum dolorem illo fugiat, possimus quam blanditiis. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo natus, placeat itaque repellendus architecto soluta unde voluptatibus tenetur sed veniam ipsam quidem autem praesentium, quaerat cumque saepe molestias eaque reiciendis!</p>
          </div> 
          <div className="timestamp absolute bottom-6 right-5  text-black/60 text-md">
            <p>Published At <span>10/09/2025</span></p>
          </div>
        </div>
        <div className="1 px-10 my-10 shadow-[0 -5 10px black/80] lg:items-start flex gap-16 items-center flex-col lg:flex lg:flex-row relative shadow-xl py-8 pb-16 cursor-pointer">
          <div className="img lg:w-[400px] min-w-[200px]">
          <img src={wolf} alt="" className='w-full rounded-2xl object-cover' />
          </div>
          <div className="content leading-9 w-full">
            <div className="profile flex items-center text-xl gap-2">
              <img src={wolf} alt="" width="40px" className='rounded-full' />
                <h1 className='flex flex-col'>Bluemoon<span className='text-sm text-black/70'>Bluemoon@gmail.com</span></h1>
                
            </div>
            <h1 className='text-3xl font-bold py-5'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h1>
            <p className='text-black/70'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores quo sit fuga consequuntur atque velit omnis magnam perferendis consectetur, aut in temporibus cum illum dolorem illo fugiat, possimus quam blanditiis. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo natus, placeat itaque repellendus architecto soluta unde voluptatibus tenetur sed veniam ipsam quidem autem praesentium, quaerat cumque saepe molestias eaque reiciendis!</p>
          </div> 
          <div className="timestamp absolute bottom-6 right-5  text-black/60 text-md">
            <p>Published At <span>10/09/2025</span></p>
          </div>
        </div>
        <div className="1 px-10 my-10 shadow-[0 -5 10px black/80] lg:items-start flex gap-16 items-center flex-col lg:flex lg:flex-row relative shadow-xl py-8 pb-16 cursor-pointer">
          <div className="img lg:w-[400px] min-w-[200px]">
          <img src={wolf} alt="" className='w-full rounded-2xl object-cover' />
          </div>
          <div className="content leading-9 w-full">
            <div className="profile flex items-center text-xl gap-2">
              <img src={wolf} alt="" width="40px" className='rounded-full' />
                <h1 className='flex flex-col'>Bluemoon<span className='text-sm text-black/70'>Bluemoon@gmail.com</span></h1>
                
            </div>
            <h1 className='text-3xl font-bold py-5'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h1>
            <p className='text-black/70'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores quo sit fuga consequuntur atque velit omnis magnam perferendis consectetur, aut in temporibus cum illum dolorem illo fugiat, possimus quam blanditiis. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo natus, placeat itaque repellendus architecto soluta unde voluptatibus tenetur sed veniam ipsam quidem autem praesentium, quaerat cumque saepe molestias eaque reiciendis!</p>
          </div> 
          <div className="timestamp absolute bottom-6 right-5  text-black/60 text-md">
            <p>Published At <span>10/09/2025</span></p>
          </div>
        </div>
        {/* <div className="1 px-10 my-10  shadow-[0 -5 10px black/80] lg:items-start sm:flex sm:gap-20 sm:items-center sm:flex-col lg:flex lg:flex-row relative shadow-xl py-8 pb-16 ">
          <div className="img lg:w-[30%] sm:w-full">
          <img src={wolf} alt="" className='w-full rounded-2xl object-cover' />
          </div>
          <div className="content leading-9 w-[50%] sm:w-full">
            <div className="profile flex items-center text-xl gap-2">
              <img src={wolf} alt="" width="40px" className='rounded-full' />
              <h1 className='flex flex-col'>Bluemoon <span className='text-sm text-black/70'>Bluemoon@gmail.com</span></h1>
            </div>
            <h1 className='text-3xl font-bold py-5'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h1>
            <p className='text-black/70'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores quo sit fuga consequuntur atque velit omnis magnam perferendis consectetur, aut in temporibus cum illum dolorem illo fugiat, possimus quam blanditiis. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo natus, placeat itaque repellendus architecto soluta unde voluptatibus tenetur sed veniam ipsam quidem autem praesentium, quaerat cumque saepe molestias eaque reiciendis!</p>
          </div> 
          <div className="timestamp absolute bottom-6 right-5  text-black/60 text-md">
            <p>Published At <span>10/09/2025</span></p>
          </div>
        </div> */}

      </div>
    </section>
  )
}

export default Home

