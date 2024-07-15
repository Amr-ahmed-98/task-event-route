import coinImg from '../../assets/loader-coin.png';
import handImg from '../../assets/loader-hand.png';
const Loader = () => {
  return (
    <>
      <div className='bg-black absolute flex justify-center items-center top-0 bottom-0 left-0 right-0 z-20'>
        <div className='loader'>
          <div className='loader__image'>
            <div className='loader__coin'>
              <img src={coinImg} alt='' />
            </div>
            <div className='loader__hand'>
              <img src={handImg} alt='' />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loader;
