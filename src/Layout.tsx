import { PropsWithChildren } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'


const Layout = ({ children }: PropsWithChildren) => (
    <>
        <Header />
        <div className=' pt-[91px]'>
            {children}
        </div>
        <Footer />
    </>

)

export default Layout