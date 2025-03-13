import { Stepper, Step, StepLabel, Typography } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import Overview from "../../components/Gigs/Overview";
import Pricing from "../../components/Gigs/Pricing";
import Description from "../../components/Gigs/Description";
import Gallery from "../../components/Gigs/Gallery";
import Publish from "../../components/Gigs/Publish";
import Requirement from "../../components/Gigs/Requirement";
import Advertisement from "../../components/Gigs/Advertisement";

const PublishGig = () => {
  const [activeStep, setActiveStep] = useState(() => {
    const savedStep = localStorage.getItem("activeStep");
    return savedStep ? parseInt(savedStep, 10) : 0;
  });
  
  // Ref to detect popstate-triggered state updates
  const isPopStateRef = useRef(false);

  // Update localStorage and browser history when activeStep changes
  useEffect(() => {
    if (activeStep <= 4) {
      localStorage.setItem("activeStep", activeStep);
      if (isPopStateRef.current) {
        window.history.replaceState({ step: activeStep }, "", `/seller/publish-gig?step=${activeStep}`);
        isPopStateRef.current = false;
      } else {
        window.history.pushState({ step: activeStep }, "", `/seller/publish-gig?step=${activeStep}`);
      }
    } else {
      localStorage.removeItem("activeStep");
    }
  }, [activeStep]);

  // Listen for popstate events to handle browser back button navigation
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && typeof event.state.step === "number") {
        isPopStateRef.current = true;
        setActiveStep(event.state.step);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const components = [
    { label: "Overview", element: <Overview setActiveStep={setActiveStep} /> },
    { label: "Pricing", element: <Pricing setActiveStep={setActiveStep} /> },
    { label: "Requirement", element: <Requirement setActiveStep={setActiveStep} /> },
    { label: "Gallery", element: <Gallery setActiveStep={setActiveStep} /> },
    { label: "Publish", element: <Publish setActiveStep={setActiveStep} /> },
    { label: "Advertisement", element: <Advertisement setActiveStep={setActiveStep} /> },
  ];

  const stepStyles = {
    "& .MuiStepIcon-root": {
      color: "gray",
    },
    "& .MuiStepConnector-line": {
      borderColor: "gray",
      borderWidth: "1px",
      borderRadius: "1px",
    },
    "& .Mui-active": {
      "&.MuiStepIcon-root": {
        color: "#DE0588",
        boxShadow: "0 0 0 2px #DE0588",
        borderRadius: "50%",
        padding: "2px",
      },
      "& .MuiStepConnector-line": {
        borderColor: "#DE0588",
        borderWidth: "1px",
        borderRadius: "1px",
      },
    },
    "& .Mui-completed": {
      "& .MuiStepIcon-root": {
        color: "#DE0588",
      },
      "& .MuiStepConnector-lineHorizontal": {
        borderColor: "#DE0588",
        borderWidth: "1px",
        borderRadius: "1px",
      },
    },
  };

  return (
    <div>
      <div className="pt-3 pb-5 px-24 text-white font-semibold text-4xl">
        Create New Gig
      </div>
      <Stepper activeStep={activeStep} alternativeLabel sx={[stepStyles, { padding: 3, margin: 0 }]}>
        {components.map((comp, index) => (
          <Step key={index}>
            <StepLabel stepIcon>
              <Typography sx={{ color: "#fff" }}>{comp.label}</Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep < components.length ? (
        components[activeStep].element
      ) : (
        <div className="text-4xl font-bold text-white text-center">
          All steps completed
        </div>
      )}
    </div>
  );
};

export default PublishGig;
