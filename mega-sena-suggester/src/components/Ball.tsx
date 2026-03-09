type BallProps = {
    num: number
    style?: React.CSSProperties
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
            color: "#ffffff",
            backgroundColor: "#028867",
            ...props.style
        }}>
            <p style={{
                color: "inherit",
                margin: 0,
                fontWeight: 700
            }}>{props.num}</p>
        </div>
    )
}

export default Ball;