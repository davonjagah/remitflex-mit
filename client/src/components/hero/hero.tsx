import { Button } from "@/widgets/button"
import { HeroContainer } from "./hero.styles";
import { useNavigate } from "react-router-dom";

const Hero = () => {
    const navigate = useNavigate();
    return (
        <HeroContainer>
            <div className="hero__left">
                <h3>
                    Send money & <br className="break" /> pay bills in Africa 
                </h3>
                <div className="btnGo">
                    <Button title="Go to App" onClick={() => navigate("/app")} />
                </div>
                <p className="powered">
                    powered by  <span className="voltage"> voltage cloud </span><img className="powerImg" src="/assets/lightning.png" alt="powered" />
                </p>
            </div>
            <div className="hero__right">
                <img src="/assets/right.png" alt="hero" />
            </div>
        </HeroContainer>
    );
};

export default Hero;