import './index.css';

const ImageLogo = () => {
    const styles = {
        image: {
            zindex: -1,
            height: 120, 
            width: 120,
            alignSelf: "flex-end",
            display: 'block !improtant',
            position: 'absolute !important',
            bottom: 0,
            left: 0, 
        }
    }
    return (
        <div className='image-logo'>
            <img style={styles.image} src={require('../../assets/Metroline.png')} />
        </div>
    );
}

export default ImageLogo;