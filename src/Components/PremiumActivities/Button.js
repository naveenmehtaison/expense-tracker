import { BsMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { ThemeReduceraction } from "../Store/themeReducer";
import { useDispatch,useSelector } from "react-redux";
const Button=()=>{
    const Dispatch = useDispatch()
    const Theme = useSelector((state)=>state.curstate)
    const switchDarkMode=()=>{
        console.log('iam inside siwtchdarkmodwe')
        Dispatch(ThemeReduceraction.setdaymode(true))
        


    }

    return(
        <>
        <div
          id="darkmode"
        >
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            // onChange prop to fire our internal function for changing the dark mode value
            onChange={switchDarkMode}
            // checking checked prop with dark mode state
            // checked={isdarkMode}
          />
          <label htmlFor="checkbox" className="label">
            <BsMoonStarsFill color="white" />
            <BsFillSunFill color="yellow" />
            <div className="ball"></div>
          </label>
        </div>
      </>
    )
}
export default Button