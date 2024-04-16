import { Avatar } from "@mui/material";
import avy from '../../images/WhatsApp Image 2024-04-16 at 23.40.06.jpeg'
import ayman from '../../images/WhatsApp Image 2024-04-16 at 23.42.57.jpeg'
import brijesh from '../../images/WhatsApp Image 2024-04-16 at 23.52.05.jpeg'

const OurTeam = () => {
    return (
        <div className="font-poppins flex flex-col lg:flex-row items-center justify-center w-full relative top-28 fadein min-h-96 mb-48 px-5">
            <div className="flex-col text-center">
                <div className="mb-6 flex justify-center" data-aos='fade-right'>
                    <Avatar className=" hover:scale-101" alt="Remy Sharp" src={avy} sx={{ width: 250, height: 250 }} />
                </div>
                <div className="font-bold text-primary-blue text-lg">Avyukth Inna</div>
                <div>avyukth.cs22@bmsce.ac.in</div>
            </div>

            <div className="flex-col text-center my-14 lg:my-0 lg:mx-20">
                <div className="mb-6 flex justify-center" data-aos='fade-up'>
                    <Avatar className=" hover:scale-101" alt="Remy Sharp" src={brijesh} sx={{ width: 250, height: 250 }} />
                </div>
                <div className="font-bold text-primary-blue text-lg">Brijesh S G</div>
                <div>brijesh.cs22@bmsce.ac.in</div>
            </div>

            <div className="flex-col text-center">
                <div className="mb-6 flex justify-center" data-aos='fade-left'>
                    <Avatar className=" hover:scale-101" alt="Remy Sharp" src={ayman} sx={{ width: 250, height: 250 }} />
                </div>
                <div className="font-bold text-primary-blue text-lg">Ayman Khan</div>
                <div>ayman.cs22@bmsce.ac.in</div>
            </div>
        </div>
    )
}

export default OurTeam;