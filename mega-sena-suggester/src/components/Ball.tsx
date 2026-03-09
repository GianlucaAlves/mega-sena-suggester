type BallProps = {
    num: number
}

function Ball(props: BallProps){
    return(
        <div style= {{
            borderRadius:"100%",
            border: "solid 2px black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "40px",
            width: "40px",
            margin: "3px",
            backgroundColor: "#028867"
        }}>
            <p style={{
                color: "#ffffff"
            }}>{props.num}</p>
        </div>
    )
}

export default Ball;