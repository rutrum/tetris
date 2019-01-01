function getColor(i) {
    switch (i) {
        case 0: return color(0,0,0);
        case 'J': return color(255, 51, 153);
        case 'L': return color(255, 153, 0);
        case 'O': return color(255, 255, 0);
        case 'S': return color(255, 0, 0);
        case 'Z': return color(0, 204, 0);
        case 'I': return color(0, 204, 255);
        case 'T': return color(89, 0, 179);
        case "shadow": return color(50, 50, 50);
    }
}   