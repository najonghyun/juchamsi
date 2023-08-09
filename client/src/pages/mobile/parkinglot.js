import React, { useState, useEffect } from 'react';
import './parkinglot.css';
import Footer from './footer';
import Box from '@mui/material/Box';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import InCar from '../../components/mobile/incar';
import { Container } from '@mui/material';
import { setWhenEnteringCar } from '../../redux/mobileUserinfo'; 
import http from "../../axios/http";
import { setBoxItem, setOuttime, setmycar, setParkingnow } from '../../redux/mobileparking'; 
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';


function Parkinglot() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleOpen = () => dispatch(setWhenEnteringCar(true));

  const handleOpenMycarPage = () => {
    // 내 주차현황 페이지로 이동
    navigate('/Mobile/Mycar');
  };

  const userid = useSelector((state) => state.mobileInfo.loginId)
  const name = useSelector((state) => state.mobileInfo.name)
  const villanumber = useSelector((state) => state.mobileInfo.villaIdNumber);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 내 주차현황 입력여부 확인
        http({
          method:'get',
          url:`/parking/entrance/${userid}`
        })
        .then((res) => {
          if (res.data.response !== null) {
            if (res.data.response.parkingNowFlag === 'TRUE') {
              dispatch(setmycar(res.data.response.seatNumber))
              handleOpen()
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })

        // 주차현황 가지고오기
        http({
          method:'get',
          url:`/parking/lot/${villanumber}`
        })
        .then((res) => {
          let resultbox = []
            for (let i=0; i<res.data.response.length; i++) {
              if (res.data.response[i].active === 'ACTIVE') {
                resultbox.push(res.data.response[i])
                if (res.data.response[i].userId === userid) {
                  dispatch(setmycar(res.data.response[i].seatNumber))
                }
                }
              }
            dispatch(setBoxItem(resultbox))
          })
        .catch((err) => {
          console.log(err)
        })
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // fetchData 함수를 호출하여 데이터를 받아옴
    fetchData();
  }, [villanumber]); // 빈 배열을 넣어서 페이지 로드 시에만 useEffect 내부 코드가 실행되도록 설정

  // Redux 상태에서 정보 가져오기
  const BoxItem = useSelector((state) => state.mycar.BoxItem);
  const mycar = useSelector((state) => state.mycar.mycar);
  const Boxrow = useSelector((state) => state.mycar.Boxrow);
  const BoxColumn = useSelector((state) => state.mycar.BoxColumn);
  const allbox = Boxrow * BoxColumn
  const Outtime = () => {
    console.log(BoxItem)
    let timelist = [];
    for (let j = 0; j <= allbox; j++) {
      timelist.push('');
    }
    for (let k = 0; k < BoxItem.length; k++) {
      timelist[BoxItem[k].seatNumber] = BoxItem[k].outTime;
    }
    return timelist;
  }
  
  const outTimeArray = Outtime(); // Outtime 함수를 호출하여 반환된 배열을 저장


  const open = useSelector((state) => state.mobileInfo.whenEnteringCar);

  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);


  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const boxWidth = (viewportWidth * 0.7 - (Boxrow * 10)) / Boxrow;
  const boxHeight = (viewportHeight * 0.3 - (BoxColumn * 10)) / BoxColumn;

  // Box 그리드를 생성하는 함수
  const renderBoxGrid = () => {
    const boxes = [];
    for (let i = 0; i < Boxrow; i++) {
      for (let j = 0; j < BoxColumn; j++) {
        const index = i * BoxColumn + j;
        const MycarIcon = i * BoxColumn + j === mycar-1;
        boxes.push(
          <button key={`${i}-${j}`} onClick={MycarIcon ? handleOpenMycarPage : null} style={{ border: 'none', backgroundColor: 'transparent', padding: 0 }}>
            <Box key={`${i}-${j}`} sx={{
              width: boxWidth,
              height: boxHeight,
              marginRight: '1rem',
              marginLeft: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: MycarIcon ? '#006DD1' : outTimeArray[index+1] !== '' ? '#EA6868' : '#FFFFFF',
              flexDirection: 'column', // 수직 방향으로 아이콘과 텍스트 정렬
            }}>
              {MycarIcon && (
                <>
                  <img src={process.env.PUBLIC_URL + "/img/mobile/mycaricon2.png"} alt={"mycarimg2"} style={{display:'flex',position:'relative',top:'-1rem'}}></img>
                  <img src={process.env.PUBLIC_URL + "/img/mobile/mycar.png"} alt={"carimg"} style={{position:'relative',top:'-1rem'}}></img>
                </>
              )}
              {!MycarIcon && outTimeArray[index+1] && (
                <>
                <p style={{ color: '#B3B3B3', fontSize: '11px', textAlign: 'center', display: 'flex', position:'relative', top:'-1.3rem'}}>
                  {outTimeArray[index+1].length > 10 ? `${outTimeArray[index+1].substring(2, 10).replace(/-/g, '.')}` : outTimeArray[index+1]}
                </p>
                <p style={{ color: '#FFFFFF', fontSize: '16px', textAlign: 'center', display: 'flex'}}>
                  {BoxItem[index].carNumber}
                </p>
                <p style={{ color: '#000000', fontSize: '15px', textAlign: 'center', display: 'flex', position:'relative', top:'1.5rem', fontWeight:'bolder' }}>
                  {outTimeArray[index+1].length > 10 ? `~${outTimeArray[index+1].substring(11, 16)}` : outTimeArray[index+1]}
                </p>
                </>
              )}
            </Box>
          </button>
        );
      }
    }
    return boxes;
  };

  return (
    <React.Fragment>
      <Container sx={{height:"90%", width:"100%"}}>
      <div className='parkinglot-main-text'>
      <div style={{ display: "flex", alignItems: "center" }}>
        <p style={{ display: "inline", fontWeight:'bolder', fontSize:'1.5rem'}}>{name}</p>
        <p style={{ display: "inline", fontSize:'1.5rem' }}>님을 위한</p>
      </div>
        <div style={{borderBottom: "8px solid rgba(0, 109, 209, 0.55)", width: `${name.length+1}rem`,display:'flex',position:'relative', top:'-0.5rem' }}></div>
        <p style={{fontSize:'1.5rem'}}>오늘의 주차 정보!</p>
      <p style={{height:'1rem', position:'relative', top:'3.5rem', left:'0.5rem', fontWeight:'bolder'}}>현재 주차 현황</p>
      </div>
      <Box className='ParkinglotBox' sx={{width:viewportWidth, height: viewportHeight * 0.68, backgroundColor:'#F2F2F2', borderRadius: '10px'}}>
      <KeyboardDoubleArrowUpIcon sx={{position:'relative', top:'4rem'}}/>
      <p style={{position:'relative',top:'4rem', fontWeight:'bolder'}}>출구</p>
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width:viewportWidth, height: viewportHeight * 0.4, justifyContent:'center', marginTop:'7rem'}}>
          {renderBoxGrid()}
        </Box>
        </Box>
      <InCar open={open} />
      </Container>
      <Footer HomeiconColor="#B7C4CF"/>
    </React.Fragment>
  );
}

export default Parkinglot;