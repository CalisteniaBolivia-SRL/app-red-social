import React, { Component } from 'react';
import { View, Text, Animated } from 'react-native';
import { Path } from 'react-native-svg';
import { STheme } from 'servisofts-component';

const AnimatedPath = Animated.createAnimatedComponent(Path);



export default class StrokeAnimated extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anim: new Animated.ValueXY({ x: 0, y: 0 }),
        };
    }
    static defaultProps = {
        d: "",
        fill: STheme.color.text,
        stroke: STheme.color.text,
        strokeWidth: 0,
        duration: 2500
    }
    componentDidMount() {
        this.fadeIn();
    }
    fadeIn = (time) => {
        Animated.timing(this.state.anim, {
            toValue: { x: 1, y: 1 },
            duration: this.props.duration
        }).start();
    }
    render() {
        return (
            <AnimatedPath
                d={this.props.d}
                stroke={this.props.stroke}
                strokeWidth={this.props.strokeWidth}
                strokeDasharray={300}
                strokeDashoffset={this.state.anim.x.interpolate({
                    inputRange: [0, 1],
                    outputRange: [300, 0]
                })}
                fill={this.state.anim.y.interpolate({
                    inputRange: [0, 0.99, 1],
                    outputRange: [this.props.fill + "ff", this.props.fill + "00", "#00000000"]
                })}
            // key={this.props.key}
            />
        );
    }
}
