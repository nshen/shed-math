export class Matrix3D {
    /*
          x   y   z   t
       -------------------
       | n11 n12 n13 n14 |
       | n21 n22 n23 n24 |
       | n31 n32 n33 n34 |
       | n41 n42 n43 n44 |
   */

    public n11: number = 1;
    public n12: number = 0;
    public n13: number = 0;
    public n14: number = 0; // tx

    public n21: number = 0;
    public n22: number = 1;
    public n23: number = 0;
    public n24: number = 0; // ty

    public n31: number = 0;
    public n32: number = 0;
    public n33: number = 1;
    public n34: number = 0; // tz

    public n41: number = 0;
    public n42: number = 0;
    public n43: number = 0;
    public n44: number = 1;

    protected _temp: Float32Array = new Float32Array(16);

    constructor(
        p11: number = 1, p12: number = 0, p13: number = 0, p14: number = 0,
        p21: number = 0, p22: number = 1, p23: number = 0, p24: number = 0,
        p31: number = 0, p32: number = 0, p33: number = 1, p34: number = 0,
        p41: number = 0, p42: number = 0, p43: number = 0, p44: number = 1) {
        this.n11 = p11; this.n12 = p12; this.n13 = p13; this.n14 = p14;
        this.n21 = p21; this.n22 = p22; this.n23 = p23; this.n24 = p24;
        this.n31 = p31; this.n32 = p32; this.n33 = p33; this.n34 = p34;
        this.n41 = p41; this.n42 = p42; this.n43 = p43; this.n44 = p44;
    }

    /**
     * column major order
     */
    get float32Array(): Float32Array {
        return this.toArray(this._temp, true);
    }
    set float32Array(arr: Float32Array) {
        this.fromArray(arr, true)
    }

    setLookAt(eyeX: number, eyeY: number, eyeZ: number,
        targetX: number, targetY: number, targetZ: number,
        upX: number, upY: number, upZ: number): void {


        let e, fx, fy, fz, rlf, rx, ry, rz, rls, ux, uy, uz;

        // foward vector
        fx = eyeX - targetX;
        fy = eyeY - targetY;
        fz = eyeZ - targetZ;

        // Normalize foward.
        rlf = 1 / Math.sqrt(fx * fx + fy * fy + fz * fz);
        fx *= rlf;
        fy *= rlf;
        fz *= rlf;

        // Calculate cross product of f and up.
        rx = fy * upZ - fz * upY;
        ry = fz * upX - fx * upZ;
        rz = fx * upY - fy * upX;

        // Normalize right vector.
        rls = 1 / Math.sqrt(rx * rx + ry * ry + rz * rz);
        rx *= rls;
        ry *= rls;
        rz *= rls;

        // Calculate cross product of r and f.
        ux = ry * fz - rz * fy;
        uy = rz * fx - rx * fz;
        uz = rx * fy - ry * fx;

        let t = this;
        // Set to this.
        t.n11 = rx; t.n12 = ux; t.n13 = fx; t.n14 = eyeX;
        t.n21 = ry; t.n22 = uy; t.n23 = fy; t.n24 = eyeY;
        t.n31 = rz; t.n32 = uz; t.n33 = fz; t.n34 = eyeZ;
        t.n41 = 0; t.n42 = 0; t.n43 = 0; t.n44 = 1;

    }

    identity(): Matrix3D {
        let t = this;
        t.n11 = 1; t.n12 = 0; t.n13 = 0; t.n14 = 0;
        t.n21 = 0; t.n22 = 1; t.n23 = 0; t.n24 = 0;
        t.n31 = 0; t.n32 = 0; t.n33 = 1; t.n34 = 0;
        t.n41 = 0; t.n42 = 0; t.n43 = 0; t.n44 = 1;
        return t;
    }

    invertTR() {
        // this method can only be used if the matrix is a translation/rotation matrix.
        // the below asserts will trigger if this is not the case.
        // if (__DEBUG__) {
            // each basis vector should be length 1

            // Math.abs(getForwardVector().lengthSqr() - 1 ) < 0.00001
            // Math.abs(upVector().lengthSqr() - 1 ) < 0.00001
            // Math.abs(RightVector().lengthSqr() - 1 ) < 0.00001

            // Math.abs(frowardVector().dot(upVector)) < 0.00001 // all vectors should be orthogonal
            // Math.abs(frowardVector().dot(rightVector)) < 0.00001 // all vectors should be orthogonal
            // Math.abs(rightVector().dot(upVector)) < 0.00001 // all vectors should be orthogonal
        // }



        return new Matrix3D();
    }

    toArray(out: Float32Array, columnMajor: boolean = true) {
        let t = this;
        if (!out)
            out = new Float32Array(16);
        if (columnMajor) {
            out[0] = t.n11; out[4] = t.n12; out[8] = t.n13; out[12] = t.n14;
            out[1] = t.n21; out[5] = t.n22; out[9] = t.n23; out[13] = t.n24;
            out[2] = t.n31; out[6] = t.n32; out[10] = t.n33; out[14] = t.n34;
            out[3] = t.n41; out[7] = t.n42; out[11] = t.n43; out[15] = t.n44;
        } else {
            out[0] = t.n11; out[1] = t.n12; out[2] = t.n13; out[3] = t.n14;
            out[4] = t.n21; out[5] = t.n22; out[6] = t.n23; out[7] = t.n24;
            out[8] = t.n31; out[9] = t.n32; out[10] = t.n33; out[11] = t.n34;
            out[12] = t.n41; out[13] = t.n42; out[14] = t.n43; out[15] = t.n44;
        }
        return out;
    }

    fromArray(arr: Float32Array, columnMajor: boolean = true) {
        let t = this;
        if (columnMajor) {
            t.n11 = arr[0]; t.n12 = arr[4]; t.n13 = arr[8]; t.n14 = arr[12];
            t.n21 = arr[1]; t.n22 = arr[5]; t.n23 = arr[9]; t.n24 = arr[13];
            t.n31 = arr[2]; t.n32 = arr[6]; t.n33 = arr[10]; t.n34 = arr[14];
            t.n41 = arr[3]; t.n42 = arr[7]; t.n43 = arr[11]; t.n44 = arr[15];
        } else {
            t.n11 = arr[0]; t.n12 = arr[1]; t.n13 = arr[2]; t.n14 = arr[3];
            t.n21 = arr[4]; t.n22 = arr[5]; t.n23 = arr[6]; t.n24 = arr[7];
            t.n31 = arr[8]; t.n32 = arr[9]; t.n33 = arr[10]; t.n34 = arr[11];
            t.n41 = arr[12]; t.n42 = arr[13]; t.n43 = arr[14]; t.n44 = arr[15];
        }
    }

}