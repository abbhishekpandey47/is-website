'use client'
import HomePage from "@/Components/HomePage/HomePage";
import { ConfigProvider } from 'antd';


export default function Home() {
  
  return (
    <div >
      <ConfigProvider theme={{
        components: {
          Button: {
            colorPrimary: '#red',
            algorithm: true, // Enable algorithm
          },
          Input: {
            colorPrimary: '#eb2f96',
            algorithm: true,
          }
        },
      }}>
        <HomePage/>
      </ConfigProvider>
    </div>
  );
}
