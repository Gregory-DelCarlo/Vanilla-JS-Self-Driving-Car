// function for linear interpolation throughout
function lerp(start,end,distance){
    // return the coordinate of the distance between start and finish
    return start + (end-start)*distance
}

//fnacy line math for now
function getIntersection(A,B,C,D){
    const tTop = (D.x-C.x)*(A.y-C.y) -(D.y-C.y)*(A.x-C.x);
    const uTop = (C.y-A.y)*(A.x-B.x) - (C.x-A.x)*(A.y-B.y);
    const bottom = (D.y-C.y)*(B.x-A.x) - (D.x-C.x)*(B.y-A.y);

    if(bottom!=0){
        const t = tTop/bottom;
        const u = uTop/bottom;

        if(t>=0 && t<=1 && u>=0 && u<=1){
            return {
                x:lerp(A.x,B.x, t),
                y:lerp(A.y, B.y, t),
                offset: t
            }
        }
    }

    return null;
}

// finds an intersection of two polygons (or polygon and segment)
function polysIntersect(poly1, poly2){
    //basic nest loop checks one segment of poly1 against all segments of poly2 until it finds an intersection
    // n^2 we can make this faster
    for(let i =0;i<poly1.length;i++){
        for(let j = 0; j<poly2.length;j++){ // we don't start at the index of I because we are comparing to seperate polys
            const touch = getIntersection(
                poly1[i],
                poly1[(i+1) % poly1.length], //if its the last point "connect" it to the initial point
                poly2[j],
                poly2[(j+1) % poly2.length],
            );

            if(touch){return true}; // break the loop and return true as soon as we find an intersection
        }
    }

    return false;
}