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
function beta(theta, theta_E) {
    return theta-theta_E**2/theta
}
function u(beta, theta_E) {
    return beta/theta_E
}
function magnification(u) {
    return (u**2+2)/(u*(u**2 + 4)**.5)
}

var d = (document.getElementById('d').value/50)*10**12
var v = (document.getElementById('v').value/50)*10**11
var m = (document.getElementById('m').value/50)*3*10**30
var D_l = (document.getElementById('D_l').value/50)*1.4*10**20
var D_s = (document.getElementById('D_s').value/50)*3.8*10**20

function draw1() {
    try {
        // compile the expression once
        var layout = {
            autosize: false, width: 500, height: 500,
            margin: {l: 50, r: 50, b: 100, t: 100, pad: 4},
        };

        d = (document.getElementById('d').value/50)*10**12
        v = (document.getElementById('v').value/50)*10**11
        m = (document.getElementById('m').value/50)*3*10**30
        D_l = (document.getElementById('D_l').value/50)*1.4*10**20
        D_s = (document.getElementById('D_s').value/50)*3.8*10**20

        const xValues = math.range(-50, 50, .25).toArray()
        const yValues = xValues.map(function (x) {
            return magnification(u(beta(theta(b(x, v, d), m), theta_E(R_sch(m), D_rel(D_l, D_s))), theta_E(R_sch(m), D_rel(D_l, D_s))))
        })

        // render the plot using plotly
        const trace1 = {x: xValues, y: yValues, type: 'scatter'}
        const data = [trace1]
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
        var r_E = theta_E(R_sch(m), D_rel(D_l, D_s))
        
        var layout = {
            autosize: false, width: 500, height: 500,
            margin: {l: 100, r: 100, b: 100, t: 100, pad: 4},
            xaxis: {
                range: [-1.2*r_E, 1.2*r_E]
            },
            yaxis: {
                range: [-1.2*r_E, 1.2*r_E]
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
                x0: -1.2*r_E,
                y0: d,
                x1: 1.2*r_E,
                y1: d,
                line: {
                    color: 'rgb(50, 171, 96)',
                    width: 4,
                    dash: 'dashdot'
                }
            }]
        };

//        const xValues = math.range(-50, 50, .25).toArray()
//        const yValues = xValues.map(function (x) {
//            return magnification(u(beta(theta(b(x, v, d), m), theta_E(R_sch(m), D_rel(D_l, D_s))), theta_E(R_sch(m), D_rel(D_l, D_s))))
//        })

        // render the plot using plotly
        const trace1 = {x: 2 * r_E, y: 2 * r_E, type: 'text'}
        const data = [trace1]
        Plotly.newPlot('plot2', data, layout)
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

draw1()