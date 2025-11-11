import { useState } from "react";
import {
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  StepTitle,
  StepDescription,
  StepSeparator,
  Box,
  useSteps,
  Button,
  Flex,
  Heading,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Logo } from "../../../../components/icons/logo";
import { EnterInfo } from "../../../../features/auth/register/personel/info";
import { CreateProfile } from "../../../../features/auth/register/personel/next-of-kin";
import { UploadDocument } from "../../../../features/auth/register/personel/document";
import { SecurityQuestions } from "../../../../features/auth/register/personel/security-questions";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../../lib/routes";
import api from "../../../../api";
import type { PersonelRegistrationData } from "../../../../lib/types";
import { PreviewStep } from "../../../../features/auth/register/personel/preview";

const steps = [
  { title: "Enter Info", description: "Basic details" },
  { title: "Create Profile", description: "Address & phone" },
  { title: "Upload Documents", description: "Credentials" },
  { title: "Security Questions", description: "Review details" },
  { title: "Review", description: "Confirm details" },
];

const SuccessPage = ({ onContinue }: { onContinue: () => void }) => (
  <VStack spacing={6} textAlign="center" py={10}>
    <Heading size="md" color="#0692DE">
      Registration Successful!
    </Heading>
    <Text color="#0692DE">Your account has been created successfully.</Text>
    <img width={200} src="/src/assets/success.svg" alt="success" />
    <Button colorScheme="blue" onClick={onContinue} mt={6} w="full">
      Login →
    </Button>
  </VStack>
);

const PersonelRegisteration = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const [personalInfo, setPersonalInfo] = useState<any>({});
  const [nextOfKinInfo, setNextOfKinInfo] = useState<any>({});
  const [documents, setDocuments] = useState<any>({});
  const [securityInfo, setSecurityInfo] = useState<any>({});

  useSteps({
    index: activeStep,
    count: steps.length,
  });

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      const payload: PersonelRegistrationData = {
        email: personalInfo.email,
        first_name: personalInfo.first_name,
        last_name: personalInfo.last_name,
        other_name: personalInfo.other_name,
        gender: personalInfo.gender,
        phone: personalInfo.phone_number,
        address: personalInfo.address,
        state_of_origin: personalInfo.state_of_origin,
        lga: personalInfo.lga,
        service_number: personalInfo.service_number,
        rank: personalInfo.rank,
        pin: personalInfo.pin,
        date_of_birth: new Date(personalInfo.date_of_birth),
        monthlyDeduction: personalInfo.monthlyDeduction || 0,
        bankName: personalInfo.bank_name,
        account_number: personalInfo.account_number,
        account_name: personalInfo.account_name,
        profile_picture: documents.picture || "",
        identification: documents.validId || "",
        id_card: documents.personnelId || "",
        signature: documents.signature || "",
        kinFirstName: nextOfKinInfo.first_name,
        kinLastName: nextOfKinInfo.last_name,
        relationship: nextOfKinInfo.relationship,
        kinPhone: nextOfKinInfo.phone,
        kinEmail: nextOfKinInfo.email,
        kinAddress: nextOfKinInfo.address,
        kinGender: nextOfKinInfo.gender,
        securityQuestion: securityInfo.question,
        securityAnswer: securityInfo.answer,
        unit: personalInfo.unit,
      };
      console.log(payload);
      formData.append("data", JSON.stringify(payload));
      if (documents.picture)
        formData.append("profile_picture", documents.picture);
      if (documents.validId)
        formData.append("identification", documents.validId);
      if (documents.personnelId)
        formData.append("id_card", documents.personnelId);
      if (documents.signature)
        formData.append("signature", documents.signature);

      await api.post("/api/auth/member/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsComplete(true);
      toast({
        title: "Registration successful",
        status: "success",
      });
    } catch (error) {
      console.error("Registration failed:", error);
      toast({
        title: "Registration failed",
        description: "Please try again",
        status: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const StepForms = [
    <Box key={0} p={6} rounded="md">
      <EnterInfo
        onFormDataChange={setPersonalInfo}
        onValidationChange={setIsFormValid}
        initialData={personalInfo}
      />
    </Box>,

    <Box key={1} p={6} rounded="md">
      <CreateProfile
        onFormDataChange={setNextOfKinInfo}
        onValidationChange={setIsFormValid}
        initialData={nextOfKinInfo}
      />
    </Box>,

    <Box key={2} p={6} rounded="md">
      <UploadDocument
        onDocumentsChange={setDocuments}
        onValidationChange={setIsFormValid}
        initialData={documents}
      />
    </Box>,

    <Box key={3} p={6} rounded="md">
      <SecurityQuestions
        onSecurityDataChange={setSecurityInfo}
        onValidationChange={setIsFormValid}
        initialData={securityInfo}
      />
    </Box>,

    <Box key={4} p={6} rounded="md">
      <PreviewStep
        personalInfo={personalInfo}
        nextOfKinInfo={nextOfKinInfo}
        documents={documents}
        securityInfo={securityInfo}
      />
    </Box>,
  ];

  if (isComplete) {
    return (
      <div
        className="min-h-screen w-full bg-[url('/src/assets/success-bg.svg')] bg-cover bg-no-repeat bg-center flex justify-center items-center"
        style={{
          backgroundAttachment: "fixed",
          overflow: "hidden",
        }}
      >
        <div className="container w-[50vw] px-4 py-8">
          <Flex justify="center" mb={6}>
            <Logo showText={false} />
          </Flex>
          <Box bg="whiteAlpha.800" p={6} rounded="lg" backdropFilter="blur(0)">
            <SuccessPage onContinue={() => navigate(routes.index)} />
          </Box>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative flex flex-col justify-center items-center">
      <div
        className="absolute inset-0 bg-[#6A9819] bg-center"
        style={{
          position: "fixed",
          zIndex: -1,
          width: "100vw",
          height: "100vh",
        }}
      />
      <div className="container w-[90vw] sm:w-[60vw] px-4 py-8">
        <Flex justify="center" mb={6}>
          <Logo showText={false} />
        </Flex>
        <Box bg="whiteAlpha.800" p={6} rounded="lg" backdropFilter="blur(0)">
          <div className="hidden md:block">
            <Stepper index={activeStep} mb={8}>
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>
                  <Box flexShrink="0">
                    <StepTitle fontSize={13}>{step.title}</StepTitle>
                    <StepDescription fontSize={11}>
                      {step.description}
                    </StepDescription>
                  </Box>
                  <StepSeparator />
                </Step>
              ))}
            </Stepper>
          </div>

          <Box
            flexGrow={1}
            overflowY="auto"
            className="custom-scrollbar"
            pr={2}
          >
            {StepForms[activeStep]}
          </Box>

          <Flex justify="space-between" mt={8} gap={2}>
            {activeStep > 0 && (
              <Button onClick={() => setActiveStep((prev) => prev - 1)}>
                Back
              </Button>
            )}
            {activeStep < steps.length - 1 ? (
              <Button
                bg="#6A9819"
                onClick={() => setActiveStep((prev) => prev + 1)}
                ml="auto"
                width="full"
                isDisabled={!isFormValid}
                opacity={!isFormValid ? 0.6 : 1}
              >
                Next →
              </Button>
            ) : (
              <Button
                isLoading={isSubmitting}
                loadingText="Submitting"
                bg="#6A9819"
                onClick={handleSubmit}
                width="full"
                isDisabled={!isFormValid}
                opacity={!isFormValid ? 0.6 : 1}
              >
                Submit →
              </Button>
            )}
          </Flex>
        </Box>
      </div>
    </div>
  );
};

export default PersonelRegisteration;
