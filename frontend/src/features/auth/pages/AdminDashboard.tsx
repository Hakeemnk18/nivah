import api from '../../../api/axios.instance'

const Home = ()=>{

    const callApi = async()=>{
        console.log("call api")
        try {
            await api.post("/auth/me")
        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <>
        <div className='bg-red-300 w-56 h-56'>
            <h1>Hello world admin dashboard</h1>
            <button onClick={callApi} className='bg-green-600'>Call Api</button>
        </div>
            
        </>
        
    )
}

export default Home