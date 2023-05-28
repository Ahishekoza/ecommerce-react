import React from 'react'
import Layout from '../components/Layout/Layout'
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const ContactUs = () => {
  return (
    <Layout title={"E-commerce Contact"}>
      <div className='row contact-us'>
        <div className='col-md-6'>
          <img src='/images/contactus.jpeg' style={{width:'100%'}} alt='contact-us'></img>
        </div>
        <div className='col-md-4'>
          <h1 className='bg-dark text-white text-center p-2'>Contact Us</h1>
          <p className="text-justify mt-2">
            any query and info about prodduct feel free to call anytime we 24X7
            vaialible
          </p>
          <p className='mt-3'>
            <BiMailSend/> www.helpline.com
          </p>
          <p className='mt-3'>
            <BiPhoneCall/> 7822578591
          </p>
          <p className='mt-3'>
            <BiSupport/> 1800-0000-000
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default ContactUs