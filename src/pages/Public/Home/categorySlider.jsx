import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import PregnantWomanIcon from '@mui/icons-material/PregnantWoman';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';

const docCategories = [{'display':'Orthopedics','icon':<AccessibilityIcon className="text-primary-yellow" fontSize="large"/>},
        {'display':'Surgery','icon':<ContentCutIcon fontSize="large"/>},
        {'display':'Cardiology', 'icon':<MonitorHeartIcon color="error" fontSize="large"/>},
        {'display':'Neurology','icon':<PsychologyIcon fontSize="large"/>},
        {'display':'Radiology', 'icon':<CrisisAlertIcon color="error" fontSize="large"/>},
        {'display':'Pediatrician','icon':<ChildCareIcon color="warning" fontSize="large"/>},
        {'display':'Gynecologist','icon':<PregnantWomanIcon fontSize="large"/>},
        {'display':'Dermatologist','icon':<MedicationLiquidIcon fontSize="large"/>}]

const CategorySlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 2,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 400,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
      };

    return (
        <div className="w-4/6 mx-5 mt-5 p-5">
            <Slider {...settings}> 
                {docCategories.map((category) => (
                <div key={category.display}>
                    <div className="mb-3">{category.icon}</div>
                    <div>{category.display}</div>
                </div>
                ))} 
            </Slider>
        </div>
    )
}

export default CategorySlider