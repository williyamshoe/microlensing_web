function b(t, v, d) {
    return ((v*t)**2 + d**2)**(.5)
}
function theta(b, m) {
    return -4*(6.67408*10**-11)*m/((3*10**8)**2*b)
}
function D_rel(D_l, D_s) {
    return (1/D_l + 1/D_s)**-1
}
function R_sch(m) {
    return 2*(6.67408*10**-11)*m/((3*10**8)**2)
}
function theta_E(R_sch, D_rel) {
    return (2*R_sch/D_rel)**.5
}
function beta(b, D_s) {
    return Math.tan(b/D_s)
}
function u(beta, theta_E) {
    return beta/theta_E
}
function magnification(u) {
    return (u**2+2)/(u*(u**2 + 4)**.5)
}

var d = (document.getElementById('d').value)*10**7
var v = (document.getElementById('v').value/50)*10**9
var m = (document.getElementById('m').value/50)*2*10**29
var D_l = (document.getElementById('D_l').value/50)*1.234*10**20
var D_s = (document.getElementById('D_s').value/50)*2.469*10**20
var xValues = math.range(-50, 50, .5).toArray()
var yValues = xValues.map(function (x) {
    return magnification(u(beta(b(x, v, d), D_s), theta_E(R_sch(m), D_rel(D_l, D_s))))
})

var x1 = 0
var y1 = 0
function draw1() {
    try {
        // compile the expression once
        var layout = {
            autosize: false, yaxis: {range: [0, 100]},  width: 500, height: 500,
            margin: {l: 50, r: 50, b: 100, t: 100, pad: 4},
        };

        d = (document.getElementById('d').value)*10**7
        v = (document.getElementById('v').value/50)*10**9
        m = (document.getElementById('m').value/2500)*3*10**29
        D_l = (document.getElementById('D_l').value/2500)*1.*10**19
        D_s = (document.getElementById('D_s').value/50)*3.8*10**19

        xValues = math.range(-50, 50, .5).toArray()
        yValues = xValues.map(function (x) {
            return magnification(u(beta(b(x, v, d), D_s), theta_E(R_sch(m), D_rel(D_l, D_s))))
        })

        // render the plot using plotly
        const trace1 = {x: xValues, y: yValues, type: 'scatter'}
        var trace2 = {
            x: [xValues[x1]],
            y: [yValues[y1]],
            mode: 'markers',
            type: 'scatter',
            marker: {
                color: 'rgb(219, 64, 82)',
                size: 15
            }
        };
        const data = [trace1, trace2]
        Plotly.newPlot('plot1', data, layout)
        draw2()
    }
    catch (err) {
        console.error(err)
        alert(err)
    }
}

function draw2() {
    
    try {
        var r_E = D_l*Math.tan(theta_E(R_sch(m), D_rel(D_l, D_s)))
        var maxdist = 50*v
        
        var layout = {
            autosize: false, width: 500, height: 500,
            margin: {l: 100, r: 100, b: 100, t: 100, pad: 4},
            xaxis: {
                range: [-1.2*maxdist, 1.2*maxdist]
            },
            yaxis: {
                range: [-1.2*maxdist, 1.2*maxdist]
            },
            shapes: [
            {
                type: 'circle',
                xref: 'x',
                    yref: 'y',
                    x0: -r_E,
                    y0: -r_E,
                    x1: r_E,
                    y1: r_E,
                    line: {
                        color: 'rgba(50, 171, 96, 1)'
                    }
            }, 
            {
                type: 'line',
                x0: -1.5*maxdist,
                y0: d,
                x1: 1.5*maxdist,
                y1: d,
                line: {
                    color: 'rgb(219, 64, 82)',
                    width: 4,
                    dash: 'dashdot'
                }
            }]
        };
        var trace2 = {
            x: [-50*v],
            y: [d],
            mode: 'markers',
            type: 'scatter',
            marker: {
                color: 'rgb(219, 64, 82)',
                size: 15
            }
        };
        const data = [trace2]
        Plotly.newPlot('plot2', data, layout)
    }
    catch (err) {
        console.error(err)
        alert(err)
    }
}

function animate1() {
    try {
        x1 += 1
        y1 += 1
        var trace3 = {
            x: [xValues[x1]],
            y: [yValues[y1]],
            mode: 'markers',
            type: 'scatter',
            marker: {
                color: 'rgb(219, 64, 82)',
                size: 15
            }
        };
        var trace4 = {
            x: [-50*v + v*x1/2],
            y: [d],
            mode: 'markers',
            type: 'scatter',
            marker: {
                color: 'rgb(219, 64, 82)',
                size: 15
            }
        };
        Plotly.animate('plot1', {
            data: [, trace3]
        }, {
            transition: {
              duration: 0
            },
            frame: {
              duration: 0,
              redraw: false
            }
          }
        )
        Plotly.animate('plot2', {
            data: [trace4]
        }, {
            transition: {
              duration: 0
            },
            frame: {
              duration: 0,
              redraw: false
            }
          }
        )
        if (x1 < xValues.length-1) {
            requestAnimationFrame(animate1)
        }
        else {
            x1 = 0;
            y1 = 0; 
            draw1();
        }
    }
    catch (err) {
        console.error(err)
        alert(err)
    }
}

document.getElementById('d').oninput = function() {
    document.getElementById('dLabel').innerHTML = "("+this.value+"/50)(10**12) m"
    draw1()
}

document.getElementById('v').oninput = function() {
    document.getElementById('vLabel').innerHTML = "("+this.value+"/50)(10**11) m/s"
    draw1()
}

document.getElementById('m').oninput = function() {
    document.getElementById('mLabel').innerHTML = "("+this.value+"/50)(3*10**30) kg"
    draw1()
}

document.getElementById('D_l').oninput = function() {
    document.getElementById('D_lLabel').innerHTML = "("+this.value+"/50)(1.5*10**20) m"
    draw1()
}

document.getElementById('D_s').oninput = function() {
    document.getElementById('D_sLabel').innerHTML = "("+this.value+"/50)(2.5*10**20) m"
    draw1()
}

document.getElementById('anibutton').onclick = function() {
    animate1()
}

draw1()