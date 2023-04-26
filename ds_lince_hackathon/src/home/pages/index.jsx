import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const Home = () => { 
   
    return (
    <>
        <section className="home-section">
        <div className="home-content" style={{justifyContent : "space-between"}}>
            <div style={{display : "flex", alignItems : "center"}}>
                <i className='bx bx-menu' ></i>
                <Box sx={{ display: 'grid', height: '9vh' }}>
                    <Typography sx={{ display: 'flex', alignItems: 'center', fontSize: "22pt", fontWeight: "600", paddingTop : "15px" }}>Home</Typography>
                    <Box sx={{ width: '2.5rem', height: '5px', marginTop: '-0.5rem', borderRadius: '5px', background: 'linear-gradient(90deg, #154360 0%, #1F618D 35%, #2980B9 100%)' }}></Box>
                </Box>
            </div>
        </div>
        </section>
    </>
    )
}

export default Home;
