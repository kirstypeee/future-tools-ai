import * as React from 'react';

export const stickMan = (className?: string) => {
    return (<div className={`stickman ${className}`} id="stickman">
        <div className="head">
            <div className="eye" />
            <div className="eye" />
        </div>
        <div className="upper-body">
            <div className="arm" id="left" />
            <div className="body" />
            <div className="arm" id="right" />
        </div>
        <div className="upper-body">
            <div className="leg" id="left" />
            <div className="leg" id="right" />
        </div>
        <div className="shadow" />
    </div>);
}