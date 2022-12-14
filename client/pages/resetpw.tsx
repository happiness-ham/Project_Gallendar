import CertifyPageLayout from "../components/CertifyPageLayout";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useCallback, useState } from "react";
import axios from "axios";
import useCheckUserId from "../hooks/user/useCheckUserId";
import AuthBtn from "../components/AuthBtn";
import EmailCheckNumberLayout from "../components/EmailCheckNumberLayout";
import SubmitBtn from "../components/SubmitBtn";
import useCheckEmail from "../hooks/user/useCheckEmail";
import useCheckAuthNum from "../hooks/user/useCheckAuthNum";
import usePatchPw from "../hooks/user/usePatchPw";
import ResetPwModal from "../components/ResetPwModal";
import useRequestAuthNum from "../hooks/user/useRequestAuthNum";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ mode: "onChange" });

  interface FormInputs {
    idErrorInput: string;
    emailErrorInput: string;
    passwordErrorInput: string;
    repasswordErrorInput: string;
  }

  interface SignUpData {
    id: string;
    email: string;
    password: string;
  }

  const [idValue, setIdValue] = useState<string>("");
  const [checkId, setCheckId] = useState<boolean>(true);
  const [isCheckSameId, setIsCheckSameId] = useState<boolean>(false);
  const [idCheckMessage, setIdCheckMessage] = useState<string>("");

  const [emailValue, setEmailValue] = useState<string>("");
  const [checkEmail, setCheckEmail] = useState<boolean>(false);
  const [isCheckSameEmail, setIsCheckSameEmail] = useState<boolean>(false);
  const [emailCheckMessage, setEmailCheckMessage] = useState<string>("");

  const [pwValue, setPwValue] = useState<string>("");
  const [checkPw, setCheckPw] = useState<boolean>(false);
  const [rePwValue, setRePwValue] = useState<string>("");
  const [checkRePw, setCheckRePw] = useState<boolean>(false);
  const [authInputView, setAuthInputView] = useState<boolean>(false);
  const [authNumValue, setAuthNumValue] = useState<string>("");
  const [checkAuthNum, setCheckAuthNum] = useState<boolean>(false);
  const [pwInputView, setPwInputView] = useState<boolean>(false);
  const [signUpData, setSignUpData] = useState<SignUpData>({
    id: idValue,
    email: emailValue,
    password: pwValue,
  });
  const [modalView, setModalView] = useState<boolean>(false);

  const { data: idData, refetch: idRefetch } = useCheckUserId(idValue);

  const { data: emailData, refetch: emailRefetch } = useCheckEmail(emailValue);

  const { data: checkAuth, mutate: checkAuthNumMute } = useCheckAuthNum({
    authNum: authNumValue,
    email: emailValue,
  });

  const { mutate: postAuthNumMute } = useRequestAuthNum({ email: emailValue });

  const { data: signupData, mutate: singUpMute } = usePatchPw(signUpData);

  const emailRex = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi;
  const pwRex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,23}$/;
  const idRex = /^[a-zA-Z0-9]{5,20}$/;

  const handleAuthClick = () => {
    setAuthInputView(true);
    postAuthNumMute({ email: emailValue });
  };

  const handleIdChange = (e: any) => {
    setIdValue(e.target.value);
    setCheckId(false);
    setIsCheckSameId(false);
    if (e.target.value.length === 0) {
      setIdCheckMessage("ID??? ?????? ????????? ?????????.");
    } else if (!idRex.test(e.target.value)) {
      setIdCheckMessage("ID??? ??????,?????? 5??? ?????? ??????????????? ?????????.");
    } else {
      setIdCheckMessage("");
      setCheckId(true);
    }
  };

  const handleIdEnter = async (e: any) => {
    //????????? ?????????????????? ???????????? ???????????? ???????????? ????????? keyCode === 13??? ????????? ????????? ?????????
    if (e.keyCode === 13) {
      e.preventDefault();

      // ID ????????? ?????? ?????? ??? ????????? ?????? ????????? ????????? ??? ????????? checkId ?????? ???????????? ?????????.
      if (checkId) {
        setIdValue(e.target.value);

        // refetch ??? ?????? ?????? ????????? ??? ????????? ??? ??????. ????????? ?????? ???????????? ???????????? ????????????, ?????? ??????????????? ????????? statusCode ??? ???????????? ???
        const { data: idRefetchData } = await idRefetch();

        const idCheckStatus = idRefetchData?.data || null;

        setIsCheckSameId(false);
        if (idCheckStatus) {
          setIdCheckMessage("???????????? ?????? ID ?????????.");
        } else {
          setIdCheckMessage("");
          setIsCheckSameId(true);
        }
      }
    }
  };

  const handleEmailChange = (e: any) => {
    setEmailValue(e.target.value);
    setCheckEmail(false);
    setIsCheckSameEmail(false);
    if (e.target.value.length === 0) {
      setEmailCheckMessage("E-mail??? ?????? ????????? ?????????.");
    } else if (!emailRex.test(e.target.value)) {
      setEmailCheckMessage("???????????? ?????? ????????? ???????????????.");
    } else {
      setEmailCheckMessage("");
      setCheckEmail(true);
    }

    // if (isCheckSameEmail) {
    //   setAuthInputView(false);
    //   setIsCheckEmail(false);
    // }
  };

  const handleEmailEnter = async (e: any) => {
    if (e.keyCode === 13) {
      e.preventDefault();

      if (checkId) {
        setEmailValue(e.target.value);

        // refetch ??? ?????? ?????? ????????? ??? ????????? ??? ??????. ????????? ?????? ???????????? ???????????? ????????????, ?????? ??????????????? ????????? statusCode ??? ???????????? ???
        const { data: emailRefetchData } = await emailRefetch();

        const emailCheckStatus = emailRefetchData?.data || null;

        setIsCheckSameEmail(false);
        if (emailCheckStatus) {
          setEmailCheckMessage("???????????? ?????? Email?????????,");
        } else {
          setIsCheckSameEmail(true);
          setEmailCheckMessage("???????????? ????????? ??????????????????");
        }
      }
    }
  };

  const handlePwChange = (e: any) => {
    if (pwRex.test(e.target.value)) {
      setCheckPw(true);
    } else {
      setCheckPw(false);
    }
    setPwValue(e.target.value);
  };

  const handleRePwChange = (e: any) => {
    if (e.target.value === pwValue) {
      setCheckRePw(true);
      setSignUpData({
        id: idValue,
        email: emailValue,
        password: e.target.value,
      });
    } else {
      setCheckRePw(false);
    }
    setRePwValue(e.target.value);
  };

  const handleAuthNumChange = (e: any) => {
    setAuthNumValue(e.target.value);
  };

  const handleClickAuthNumBtn = () => {
    // ????????? ??????
    checkAuthNumMute({ authNum: authNumValue, email: emailValue });
    console.log(checkAuth);
    setCheckAuthNum(true);
    setAuthInputView(false);
    setPwInputView(true);
  };

  const handleClickSubmit = async (e: any) => {
    e.preventDefault();

    // console.log(idValue, emailValue, pwValue);
    singUpMute(signUpData);

    setModalView(true);

    // console.log(signUpData);
    // console.log(signupData);
  };

  return (
    <>
      {modalView && checkRePw && checkPw ? <ResetPwModal /> : null}
      <CertifyPageLayout>
        <div
          className={`flex flex-col items-start justify-start w-full h-full `}
        >
          <div className="relative items-center justify-center w-fit h-7 ">
            <div className="z-10 text-base md:text-xl lg:text-2xl text-zinc-500 font-SCDream6">
              ???????????? ?????????
            </div>
            <div className="absolute left-0 right-0 top-5 md:top-6 lg:top-7 bottom-1 md:bottom-0 lg:-bottom-1 bg-mainOrange/40"></div>
          </div>
          <div
            key={"idCheckForm"}
            className={`w-full ${
              isCheckSameId && isCheckSameEmail && checkAuth?.data
                ? " hidden"
                : null
            }`}
          >
            <div className="flex flex-col w-full h-fit">
              <div className="relative items-center justify-center w-fit h-7 mt-7">
                <label
                  htmlFor="identity"
                  className="text-base text-gray-500 font-SCDream5"
                >
                  ID
                </label>
                <div className="absolute top-4 md:top-4.5 lg:top-4 left-0 right-0 bottom-2 md:bottom-1.5 lg:bottom-1.5 bg-mainOrange/40"></div>
              </div>
              <input
                className="font-SCDream3 text-gray-500 w-full text-xs md:text-sm mt-2 border-b-[1px] border-mainOrange/40 outline-none"
                id="identity"
                autoComplete="off"
                type="text"
                value={idValue}
                onChange={handleIdChange}
                onKeyDown={handleIdEnter}
                placeholder="ID??? ?????? ??? Enter??? ???????????????"
              />
              {/* API ?????? ??? ?????? ?????? */}
              {checkId && isCheckSameId ? null : (
                <div className="flex flex-row items-end justify-end w-full mt-1 text-[10px] md:text-[11px] text-nagativeMessage h-fit font-SCDream2">
                  {idCheckMessage}
                </div>
              )}
            </div>

            <div className="flex flex-col w-full h-fit">
              <div className="relative items-center justify-center w-fit h-7 mt-5">
                <label
                  htmlFor="email"
                  className="text-base text-gray-500 font-SCDream5"
                >
                  E-mail
                </label>
                <div className="absolute top-4 md:top-4.5 lg:top-4 left-0 right-0 bottom-2 md:bottom-1.5 lg:bottom-1.5 bg-mainOrange/40"></div>
              </div>
              <div className="flex flex-row items-end justify-center w-full h-fit">
                <input
                  className="font-SCDream3 text-gray-500 w-full text-xs md:text-sm mt-2 border-b-[1px] border-mainOrange/40 outline-none"
                  id="email"
                  autoComplete="off"
                  type="text"
                  value={emailValue}
                  onChange={handleEmailChange}
                  onKeyDown={handleEmailEnter}
                  disabled={!isCheckSameId}
                  placeholder="Email ?????? ??? Enter??? ???????????????"
                />
                {isCheckSameEmail && !checkAuthNum ? (
                  <AuthBtn onClick={handleAuthClick}>????????????</AuthBtn>
                ) : isCheckSameEmail && checkAuthNum ? (
                  <AuthBtn
                    onClick={() => {
                      return 0;
                    }}
                  >
                    ????????????
                  </AuthBtn>
                ) : null}
              </div>
              {checkEmail && isCheckSameEmail ? null : (
                <div className="flex flex-row items-end justify-end w-full mt-1 text-[10px] md:text-[11px] text-nagativeMessage h-fit font-SCDream2">
                  {emailCheckMessage}
                </div>
              )}
              {checkEmail && isCheckSameEmail && !checkAuth?.response ? (
                <div className="flex flex-row items-end justify-end w-full mt-1 text-[10px] md:text-[11px] text-mainOrange h-fit font-SCDream2">
                  {emailCheckMessage}
                </div>
              ) : null}
            </div>
          </div>

          {authInputView || checkAuth?.response ? (
            <EmailCheckNumberLayout>
              <div className="text-xs text-mainOrange font-SCDream4 md:text-sm">
                ???????????? Email??? ??????????????? ?????????????????????
              </div>
              {authNumValue.length !== 0 && checkAuth?.response ? ( //?????? ????????? ?????? ?????? ??????
                <div className=" text-nagativeMessage font-SCDream3 text-[11px] md:text-[12px] mt-2">
                  ??????????????? ???????????? ????????????
                </div>
              ) : (
                <div className=" text-nagativeMessage font-SCDream3 text-[11px] md:text-[12px] mt-2">
                  5???????????? ??????????????????
                </div>
              )}

              <input
                className="flex pl-5 pr-5 pt-1 pb-1 mt-3 mb-3 font-SCDream3 text-gray-500 w-60 h-fit text-xs md:text-sm outline-none text-center rounded-md border-b-[1px] border-mainOrange/40"
                placeholder="??????????????? ???????????????"
                value={authNumValue}
                onChange={handleAuthNumChange}
              />
              <AuthBtn onClick={handleClickAuthNumBtn}>??????</AuthBtn>
            </EmailCheckNumberLayout>
          ) : isCheckSameEmail &&
            !authInputView &&
            pwInputView &&
            checkAuth?.data ? (
            <form className="w-full" onSubmit={handleClickSubmit}>
              <div className="flex flex-col w-full h-fit">
                <div className="flex flex-col w-full md:flex-row h-fit">
                  <div className="relative items-center justify-center w-fit h-7 mt-5">
                    <label
                      htmlFor="password"
                      className="text-base text-gray-500 font-SCDream5"
                    >
                      ????????????
                    </label>
                    <div className="absolute top-4 md:top-4.5 lg:top-4 left-0 right-0 bottom-2 md:bottom-1.5 lg:bottom-1.5 bg-mainOrange/40"></div>
                  </div>
                  <div className="font-SCDream3 text-gray-400 w-fit h-fit text-[10px] mt-0 md:mt-7 ml-0 md:ml-2">
                    ????????????, ?????????, ?????? ?????? 8?????? ???????????? ??????????????????
                  </div>
                </div>
                <input
                  className="font-SCDream3 text-gray-500 w-full text-xs md:text-sm mt-2 border-b-[1px] border-mainOrange/40 outline-none"
                  id="email"
                  autoComplete="off"
                  type="password"
                  value={pwValue}
                  placeholder="??????????????? ???????????????"
                  {...register("passwordErrorInput", {
                    required: "??????????????? ?????? ???????????????.",
                    onChange: handlePwChange,
                  })}
                />

                <ErrorMessage
                  errors={errors}
                  name="passwordErrorInput"
                  render={({ message }) => (
                    <div className="flex flex-row items-end justify-end w-full mt-1 text-xs text-nagativeMessage h-fit font-SCDream2">
                      {message}
                    </div>
                  )}
                />
                {pwValue.length !== 0 && checkPw ? (
                  <div className="flex flex-row items-end justify-end w-full mt-1 text-[10px] md:text-[11px] text-mainOrange h-fit font-SCDream2">
                    ????????? ???????????? ???????????????
                  </div>
                ) : pwValue.length !== 0 && !checkPw ? (
                  <div className="flex flex-row items-end justify-end w-full mt-1 text-[10px] md:text-[11px] text-nagativeMessage h-fit font-SCDream2">
                    ???????????? ????????? ???????????? ????????????
                  </div>
                ) : null}
              </div>

              <div className="flex flex-col w-full h-fit">
                <div className="relative items-center justify-center w-fit h-7 mt-3">
                  <label
                    htmlFor="checkpassword"
                    className="text-base text-gray-500 font-SCDream5"
                  >
                    ???????????? ??????
                  </label>
                  <div className="absolute top-4 md:top-4.5 lg:top-4 left-0 right-0 bottom-2 md:bottom-1.5 lg:bottom-1.5 bg-mainOrange/40"></div>
                </div>
                <input
                  className="font-SCDream3 text-gray-500 w-full text-xs md:text-sm mt-2 mb-0 border-b-[1px] border-mainOrange/40 outline-none"
                  id="checkpassword"
                  autoComplete="off"
                  type="password"
                  value={rePwValue}
                  placeholder="?????? ?????? ??????????????? ???????????????"
                  {...register("repasswordErrorInput", {
                    required: "??????????????? ???????????????",
                    onChange: handleRePwChange,
                  })}
                />

                <ErrorMessage
                  errors={errors}
                  name="repasswordErrorInput"
                  render={({ message }) => (
                    <div className="flex flex-row items-end justify-end w-full mt-1 text-xs text-nagativeMessage h-fit font-SCDream2">
                      {message}
                    </div>
                  )}
                />
                {rePwValue.length !== 0 && checkRePw ? (
                  <div className="flex flex-row items-end justify-end w-full mt-1 text-[10px] md:text-[11px] text-mainOrange h-fit font-SCDream2">
                    ??????????????? ???????????????
                  </div>
                ) : rePwValue.length !== 0 && !checkRePw ? (
                  <div className="flex flex-row items-end justify-end w-full mt-1 text-[10px] md:text-[11px]  text-nagativeMessage h-fit font-SCDream2">
                    ??????????????? ???????????? ????????????
                  </div>
                ) : null}
              </div>
              {isCheckSameId && isCheckSameEmail && checkPw && checkRePw ? (
                <div className="flex flex-row items-center justify-end w-full h-fit mt-4">
                  <SubmitBtn onClick={() => handleClickSubmit} />
                </div>
              ) : null}
            </form>
          ) : null}
        </div>
      </CertifyPageLayout>
    </>
  );
};

export default SignUp;
