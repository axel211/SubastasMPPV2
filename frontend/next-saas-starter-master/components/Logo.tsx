import logo from 'public/logoMuni/LogoMPP.svg'
export default function Logo({ ...rest }) {
  return (
    <div>
    <img src={logo} alt="Logo" className="logo" style={{ width: '250px', height: 'auto' }} />
  </div>
  );
}
