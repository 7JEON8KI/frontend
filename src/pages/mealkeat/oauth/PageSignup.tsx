import React, { useState } from "react";
import { Layout } from "components/mealkeat";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import DaumPostcode from "react-daum-postcode";
import { useNavigate } from "react-router-dom";
import memberApi from "apis/memberApi";
import dayjs from "dayjs";

interface address {
  zonecode: string;
  roadAddress: string;
}

interface oAuthMemberRequestDto {
  infoAddr: string;
  infoZipcode: string;
  memberBirth: string;
  memberEmail: string;
  memberGender: string;
  memberImage: string;
  memberName: string;
  memberNickname: string;
  memberPhone: string;
  refreshToken: string;
}

const PageSignup: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState<dayjs.Dayjs | null>(null);
  const [zipCode, setZipCode] = useState<string>("");
  const [roadAddress, setRoadAddress] = useState<string>("");
  const [detailAddress, setDetailAddress] = useState<string>("");
  const [isOpenPostcode, setIsOpenPostcode] = useState<boolean>(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleDetailAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetailAddress(e.target.value);
  };

  const handleComplete = (data: address) => {
    setZipCode(data.zonecode);
    setRoadAddress(data.roadAddress);
    setIsOpenPostcode(false);
  };
  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Form 데이터를 member 상태에 설정
    const updatedMember: oAuthMemberRequestDto = {
      memberName: name,
      memberEmail: email,
      memberNickname: nickname,
      memberPhone: phone,
      infoAddr: roadAddress + " " + detailAddress,
      infoZipcode: zipCode,
      memberBirth: birthDate ? birthDate.format("YYYY-MM-DD") : "",
      memberGender: gender,
      memberImage: "",
      refreshToken: "",
    };

    try {
      await memberApi.saveMember(updatedMember);
      navigate("/login"); // 회원가입 성공 후 로그인 페이지로 이동
    } catch (error) {
      console.error(error);
    }
  };

  // 생년월일 선택 핸들러
  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    setBirthDate(newValue);
  };

  const style = {
    infoTitle: {
      fontWeight: "bold",
      fontSize: "20px",
    },
    inputField: {
      padding: "10px",
      margin: "5px 0",
      width: "100%",
      borderRadius: "4px",
      border: "1px solid #ccc",
    },
  };
  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <span
          style={{
            fontSize: "32px",
            fontWeight: "bold",
          }}
        >
          환영합니다!
        </span>
        <span
          style={{
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          회원가입 페이지입니다.
        </span>
        <form
          style={{
            width: "300px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            justifyContent: "center",
          }}
          onSubmit={handleSubmit}
        >
          <div>
            <span style={style.infoTitle}>이름</span>
            <div>
              <input style={style.inputField} onChange={handleNameChange} type="text" />
            </div>
          </div>
          <div>
            <span style={style.infoTitle}>이메일</span>
            <div>
              <input style={style.inputField} onChange={handleEmailChange} type="text" />
            </div>
          </div>
          <div>
            <span style={style.infoTitle}>닉네임</span>
            <div>
              <input style={style.inputField} onChange={handleNicknameChange} type="text" />
            </div>
          </div>

          <div>
            <div style={style.infoTitle}>휴대폰번호</div>
            <div>
              <input style={style.inputField} onChange={handlePhoneChange} type="text" />
            </div>
          </div>
          <div>
            <span style={style.infoTitle}>성별</span>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                justifyContent: "center",
                margin: "10px 0",
              }}
            >
              <input type="radio" name="gender" value="1" checked={gender === "1"} onChange={handleGenderChange} />
              <label>남자</label>
              <input type="radio" name="gender" value="2" checked={gender === "2"} onChange={handleGenderChange} />
              <label>여자</label>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              justifyContent: "center",
            }}
          >
            <span style={style.infoTitle}>생년월일</span>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="생년월일을 선택해주세요"
                  slotProps={{
                    textField: {
                      size: "small",
                    },
                  }}
                  format="YYYY / MM / DD"
                  onChange={handleDateChange}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div>
            <span style={style.infoTitle}>주소</span>
            <div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <input
                    style={{
                      padding: "10px",
                      margin: "5px 0",
                      width: "30%",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                      pointerEvents: "none",
                    }}
                    value={zipCode}
                  ></input>
                  <button
                    style={{
                      padding: "8px",
                      width: "30%",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                      cursor: "pointer",
                    }}
                    onClick={() => setIsOpenPostcode(true)}
                  >
                    우편번호 검색
                  </button>
                </div>
                {isOpenPostcode && (
                  <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                    <DaumPostcode onComplete={handleComplete} autoClose />
                  </div>
                )}
              </div>
              <input
                style={{
                  padding: "10px",
                  margin: "5px 0",
                  width: "100%",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  pointerEvents: "none",
                }}
                value={roadAddress}
              ></input>
            </div>
          </div>
          <div>
            <span style={style.infoTitle}>상세주소</span>
            <div>
              <input style={style.inputField} onChange={handleDetailAddressChange} type="text" />
            </div>
          </div>
          <div>
            <button
              type="submit"
              style={{
                padding: "10px",
                margin: "5px 0",
                width: "100%",
                borderRadius: "4px",
                border: "1px solid #ccc",
                cursor: "pointer",
              }}
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default PageSignup;
