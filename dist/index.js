'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class Vector2D {
  constructor(x = 0, y = 0) {
    this.x = void 0;
    this.y = void 0;
    this.x = x;
    this.y = y;
  }
  /**
   * 两点间线性插值
   * @param t t 为 0 ~ 1 之间的小数，为 0 则结果为 v1，为 1 则结果为 v2
   * @param out 省略则返回一个新创建的 Vector2D 否则复制到 out 向量
   */


  static Lerp(v1, v2, t = 0, out) {
    let nx = v1.x + (v2.x - v1.x) * t;
    let ny = v1.y + (v2.y - v1.y) * t; // same as
    // nx = v1.x * (1 - t) + v2.x * t;
    // ny = v1.y * (1 - t) + v2.y * t;

    if (out) {
      out.x = nx;
      out.y = ny;
      return out;
    }

    return new Vector2D(nx, ny);
  }
  /**
   * 返回一个指定长度的随机方向向量
   * @static
   * @param scale 向量长度，默认为1
   * @param out 省略则返回一个新创建的 Vector2D 否则复制到 out 向量
   */


  static Random(scale = 1, out) {
    let r = Math.random() * 2 * Math.PI;
    let nx = Math.cos(r) * scale;
    let ny = Math.sin(r) * scale;

    if (out) {
      out.x = nx;
      out.y = ny;
      return out;
    }

    return new Vector2D(nx, ny);
  }
  /**
   * 取得两向量之间夹角的弧度值，逆时针为正    
   * @static 
   * @param {Vector2D} v1
   * @param {Vector2D} v2
   * @returns {number} 两向量之间夹角，单位为弧度得
   * 
   * @memberOf Vector2D
   */


  static AngleBetween(v1, v2) {
    return Math.atan2(v1.cross(v2), v1.dot(v2)); //  tan = sin / cos
  }
  /**
   * 极坐标转换为笛卡尔坐标 
   * 
   * @static
   * @param {number} len 半径长度
   * @param {number} radians 弧度值
   * @returns
   * 
   * @memberOf Vector2D
   */


  static fromPolar(len, radians, out) {
    let nx = len * Math.cos(radians);
    let ny = len * Math.sin(radians);

    if (out) {
      out.x = nx;
      out.y = ny;
      return out;
    }

    return new Vector2D(nx, ny);
  } // getter
  // ------------------------------------------

  /**
   * 取向量长度
   * @type {number}
   * @memberOf Vector2D
   */


  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  /**
   * 设置向量长度
   * @memberOf Vector2D
   */


  set length(value) {
    let angle = Math.atan2(this.y, this.x);
    this.x = Math.cos(angle) * value;
    this.y = Math.sin(angle) * value;
  }
  /**
   * 取向量长度的平方，由于不用开方运算，效率更高
   * @readonly
   * @type {number}
   * @memberOf Vector2D
   */


  get lengthSquared() {
    return this.x * this.x + this.y * this.y;
  }
  /**
   * 是否为0向量
   * @readonly
   * @type {boolean}
   * @memberOf Vector2D
   */


  get isZero() {
    return this.x === 0 && this.y === 0;
  } // public methods
  // ----------------------------------------

  /**
   * 向量相加
   * 
   * @param {Vector2D} v
   * @returns {Vector2D} this = this + v
   * 
   * @memberOf Vector2D
   */


  add(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }
  /**
   * 向量相减
   * @param {Vector2D} v
   * @return {Vector2D} this = this - v
   */


  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }
  /**
   * 向量相乘
   * @param {Vector2D} v
   * @returns {Vector2D} this = this multiply v 
   * 
   * @memberOf Vector2D
   */


  multiply(v) {
    this.x *= v.x;
    this.y *= v.y;
    return this;
  }
  /**
   * 向量相除
   * 
   * @param {Vector2D} v
   * @returns {Vector2D} this  = this / v
   * 
   * @memberOf Vector2D
   */


  divide(v) {
    this.x /= v.x;
    this.y /= v.y;
    return this;
  }
  /**
   * 缩放向量
   * 
   * @param {number} s
   * @returns {Vector2D} this = this * s
   * 
   * @memberOf Vector2D
   */


  scale(s) {
    this.x *= s;
    this.y *= s;
    return this;
  }
  /**
   * 基于某个点缩放
   * todo: 图形实例
   * @param {Vector2D} point 基于该点缩放
   * @param {number} sx (description)
   * @param {number} sy (description)
   * @returns {Vector2D} (description)
   */


  scaleAbout(point, sx, sy) {
    ///////////////////////////
    // |sx  0  px(1-sx)|     x
    // |0  sy  py(1-sy)|  *  y
    // |0   0      1   |     1
    ////////////////////////////
    this.x = sx * this.x + point.x * (1 - sx);
    this.y = sy * this.y + point.y * (1 - sy);
    return this;
  }
  /**
   * 与缩放过的v相加
   * @param {Vector2D} v
   * @param {number} scale
   * @returns {Vector2D}
   * 
   * @memberOf Vector2D
   */


  scaleAndAdd(v, scale) {
    this.x = this.x + v.x * scale;
    this.y = this.y + v.y * scale;
    return this;
  }
  /**
   * 返回从此点到p2点之间的距离
   */


  distanceTo(p2) {
    let x = p2.x - this.x;
    let y = p2.y - this.y;
    return Math.sqrt(x * x + y * y);
  }
  /**
   * 此点到p2距离的平方
   */


  squaredDistanceTo(p2) {
    let x = p2.x - this.x;
    let y = p2.y - this.y;
    return x * x + y * y;
  }
  /**
   * x,y取负
   * @returns {Vector2D}
   * 
   * @memberOf Vector2D
   */


  negate() {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  }
  /**
   * 转为单位向量,数学上经常在向量上加个小帽子表示 :)
   * @warning 修改自身
   * @returns {Vector2D}
   * 
   * @memberOf Vector2D
   */


  normalize() {
    let len = this.x * this.x + this.y * this.y;

    if (len === 0) {
      this.x = 1;
      this.y = 0;
    } else {
      len = 1 / Math.sqrt(len);
      this.x *= len;
      this.y *= len;
    }

    return this;
  } // ----------------------点乘的性质--------------------------//
  // a点乘b == 0 ，两向量垂直
  // a点乘b > 0 ，同向（夹角小于90度）
  // a点乘b < 0 ,反向（夹角大于90度）
  // a点乘b ==  length(a) * length(b)，共线且同向 (如果a与b都为单位向量则等于 +1)
  // a点乘b == -length(a) * length(b) ,共线且逆向（如果a与b都为单位向量则等于 -1）
  // a点乘a == a长度的平方
  // --------------------------------------------------------//

  /**
   * 点乘
   * 结果等于|a||b|cos夹角
   * @param v
   * @returns {number}
   */


  dot(v) {
    return this.x * v.x + this.y * v.y;
  } // ----------------------2d cross--------------------------//
  //
  //    http://allenchou.net/2013/07/cross-product-of-2d-vectors/
  //
  //    the sign of the cross product of 2D vectors tells you whether the second vector is on the left or right side of the first vector .
  //
  // not the most efficient implementation
  //   float cross(const Vec2 &a, const Vec2 &b)
  //    {
  ////       Vec3 v1(a.x, a.y, 0.0f);
  ////       Vec3 v2(b.x, b.y, 0.0f);
  //
  //        return cross(v1, v2).z;
  //    }
  //
  // --------------------------------------------------------//

  /**
   * 2d叉乘
   * 2d叉乘并不常见，与3d不同，结果是一个数值，相当于3d叉乘的z轴
   * 
   * @param {Vector2D} v
   * @returns {number}
   * 
   * @memberOf Vector2D
   */


  cross(v) {
    return this.x * v.y - this.y * v.x;
  }
  /**
   * 返回左垂直向量
   * 
   * @returns {Vector2D} 非单位向量
   * @memberOf Vector2D
   */


  leftHandNormal() {
    let xx = this.x;
    this.x = -this.y;
    this.y = xx;
    return this;
  }
  /**
   * 返回右垂直向量
   * 
   * @returns {Vector2D} 非单位向量
   * @memberOf Vector2D
   */


  rightHandNormal() {
    let xx = this.x;
    this.x = this.y;
    this.y = -xx;
    return this;
  }
  /**
   * 将极坐标转为笛卡尔坐标
   * 
   * @warning 修改自身
   * @param len 半径长度
   * @param radians 弧度值 ,逆时针正角度
   * @param return 返回自身
   */


  fromPolar(len, radians) {
    this.x = len * Math.cos(radians);
    this.y = len * Math.sin(radians);
    return this;
  }
  /**
    * 将此向量转为极坐标输出
    * 
    * @returns {{ len: number; radians: number }} 角度为弧度值表示
    * 
    * @memberOf Vector2D
    */


  toPolar() {
    let len = Math.sqrt(this.x * this.x + this.y * this.y);
    let radians = Math.atan2(this.y, this.x);
    return {
      len: len,
      radians: radians
    };
  }
  /**
   * 按最大长度夹断 
   * 
   * @warning 修改本身
   * @param {number} max 最大长度
   * @returns {Vector2D}
   * 
   * @memberOf Vector2D
   */


  clampMax(max) {
    let l = Math.sqrt(this.x * this.x + this.y * this.y);

    if (l > max) {
      l = max / l;
      this.x *= l;
      this.y *= l;
    }

    return this;
  }
  /**
    * 绕原点旋转一个角度 ，逆时针为正，浮点数计算会有误差
    * 
    * @param {number} radians 弧度值
    * @returns {Vector2D} 旋转后的向量
    * 
    * @memberOf Vector2D
    */


  rotate(radians) {
    // （矩阵乘法） 
    ////////////////////////////////
    //  |cos  -sin  0|      x
    //  |sin   cos  0|  *   y
    //  | 0     0   1|      1
    let cos = Math.cos(radians);
    let sin = Math.sin(radians);
    let _x = this.x;
    let _y = this.y;
    this.x = _x * cos - _y * sin;
    this.y = _x * sin + _y * cos;
    return this;
  }
  /**
   * 绕某个点旋转
   * todo: example
   * 
   * @param {number} radians 弧度值表示的角度
   * @param {Vector2D} point
   * @returns {Vector2D}
   * 
   * @memberOf Vector2D
   */


  rotateAbout(radians, point) {
    let c = this.clone();
    this.sub(point).rotate(radians).add(c);
    return this;
  }
  /**
   * 旋转一个向量表示的角度，与rotate方法类似，但节省了计算sin/cos所以效率更高
   * 要注意如果v非单位向量则旋转后向量长度会改变
   * 
   * @param {Vector2D} v
   * @param {Vector2D} [out]
   * @returns {Vector2D}
   * 
   * @memberOf Vector2D
   */


  rotateByVector(v) {
    let _x = this.x;
    let _y = this.y;
    this.x = _x * v.x - _y * v.y;
    this.y = _x * v.y + _y * v.x;
    return this;
  }
  /**
   *  取得此向量在v向量上的投影向量
   * 
   * @param {Vector2D} v
   * @returns {Vector2D}
   * 
   * @memberOf Vector2D
   */


  getProjV(v) {
    //
    //         /|
    //   this / | 
    //       /  |
    //      --------  v
    //      ProjV
    //
    // -------------------------
    //
    //     |a||b|cos
    //    ----------- b
    let dp = this.x * v.x + this.y * v.y; // this.dot(v)

    let f = dp / (v.x * v.x + v.y * v.y); // divide by |b|^2

    this.x = f * v.x;
    this.y = f * v.y;
    return this;
  }
  /**
    * 
    * 取得此向量在v法线上的投影向量
    * 
    * @param {Vector2D} v
    * @returns {Vector2D}
    * 
    * @memberOf Vector2D
    */


  getPerpV(v) {
    //---------------------------------
    //           /|
    //     this / | PerpV
    //         /  |
    //        --------
    //            v
    // --------------------------------
    // var v:Vector2D = this.getProjV(v);
    let dp = this.x * v.x + this.y * v.y; // this.dot(v)

    let f = dp / (v.x * v.x + v.y * v.y); // divide by |b|^2

    this.x = f * v.x;
    this.y = f * v.y;
    return this;
  }
  /**
   * 根据入射角 = 反射角理论，计算此向量经过法向量反射后的向量
   * @param n 单位法向量
   * @returns {Vector2D} 反射后得到的向量
   */


  reflect(n) {
    //  ---------------------------
    //  tail\  |  / head
    //       \ |n/
    //   head \|/ tail
    //    ------------
    //  --------------------------  
    // v = u - 2(u.n)n
    let nc = n.clone(); // 不能改变 n

    this.sub(nc.scale(2 * this.dot(nc)));
    return this;
  }
  /**
   * 从另一个向量拷贝 xy 值
   * 
   * @param {Vector2D} v
   * @returns {Vector2D}
   * 
   * @memberOf Vector2D
   */


  copyFrom(v) {
    this.x = v.x;
    this.y = v.y;
    return this;
  }
  /**
   * 重设 xy 值 
   * 
   * @warning 此方法修改自身
   * @param {number} [x=0]
   * @param {number} [y=0]
   * @returns {Vector2D}
   * 
   * @memberOf Vector2D
   */


  reset(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    return this;
  }
  /**
   * 复制一个向量
   * 
   * @returns {Vector2D}
   * 
   * @memberOf Vector2D
   */


  clone() {
    return new Vector2D(this.x, this.y);
  }
  /**
   * 输出字符串
   * 
   * @returns {string}
   * 
   * @memberOf Vector2D
   */


  toString() {
    return "[Vector2D] (x:" + this.x + " ,y:" + this.y + ")";
  }

}

class Vector3D {
  constructor(x = 0, y = 0, z = 0, w = 0) {
    this.x = void 0;
    this.y = void 0;
    this.z = void 0;
    this.w = void 0;
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  get length() {
    return Math.sqrt(this.lengthSquared);
  }

  get lengthSquared() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  static angleBetween(a, b) {
    return Math.acos(a.dotProduct(b) / (a.length * b.length));
  }
  /**
   * [static] Returns the distance between two points.
   */


  static distance(pt1, pt2) {
    var x = pt1.x - pt2.x;
    var y = pt1.y - pt2.y;
    var z = pt1.z - pt2.z;
    return Math.sqrt(x * x + y * y + z * z);
  }

  add(a) {
    this.x += a.x;
    this.y += a.y;
    this.z += a.z;
    return this;
  }

  sub(a) {
    this.x -= a.x;
    this.y -= a.y;
    this.z -= a.z;
    return this;
  }
  /**
   * 是否为0向量
   */


  get isZero() {
    return this.x === 0 && this.y === 0 && this.z === 0;
  }

  equals(toCompare, allFour = false) {
    return this.x === toCompare.x && this.y === toCompare.y && this.z === toCompare.z && (allFour ? this.w === toCompare.w : true);
  }

  nearEquals(toCompare, tolerance = 0.0001, allFour = false) {
    let abs = Math.abs;
    return abs(this.x - toCompare.x) < tolerance && abs(this.y - toCompare.y) < tolerance && abs(this.z - toCompare.z) < tolerance && (allFour ? abs(this.w - toCompare.w) < tolerance : true);
  }

  clone() {
    return new Vector3D(this.x, this.y, this.z, this.w);
  }
  /**
   * Copies all of vector data from the source Vector3D object into the calling Vector3D object.
   */


  copyFrom(sourceVector3D) {
    this.x = sourceVector3D.x;
    this.y = sourceVector3D.y;
    this.z = sourceVector3D.z;
    this.w = sourceVector3D.w;
  }
  /**
   * Sets the members of Vector3D to the specified values
   */


  setTo(xa, ya, za) {
    this.x = xa;
    this.y = ya;
    this.z = za;
  }

  negate() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
  }

  scaleBy(s) {
    this.x *= s;
    this.y *= s;
    this.z *= s;
  }

  normalize() {
    var leng = this.length;
    if (leng != 0) this.scaleBy(1 / leng);
    return leng;
  }

  crossProduct(a) {
    return new Vector3D(this.y * a.z - this.z * a.y, this.z * a.x - this.x * a.z, this.x * a.y - this.y * a.x);
  }

  dotProduct(a) {
    return this.x * a.x + this.y * a.y + this.z * a.z;
  }

  project() {
    if (this.w == 0) return;
    this.x /= this.w;
    this.y /= this.w;
    this.z /= this.w;
  }

  toString() {
    return "[Vector3D] (x:" + this.x + " ,y:" + this.y + ", z:" + this.z + ", w:" + this.w + ")";
  }

}
Vector3D.X_AXIS = new Vector3D(1, 0, 0);
Vector3D.Y_AXIS = new Vector3D(0, 1, 0);
Vector3D.Z_AXIS = new Vector3D(0, 0, 1);

class Matrix2D {
  /**
   * 创建一个3*3矩阵
   * 
   * 使用矩阵后乘列向量的方式执行变换，与 glsl 里顺序一致
  ```
  |  a   b   tx |      x
  |  c   d   ty |  *   y
  |  0   0   1  |      1
  ```
  可以使用静态方法更方便的创建矩阵
  Matrix2D.FromRotation(rad: number)
  Matrix2D.FromTranslation(posX: number, posY: number)
  Matrix2D.FromScaling()
  Matrix2D.SRT()
   */
  constructor(a = 1, b = 0, c = 0, d = 1, tx = 0, ty = 0) {
    this.a = void 0;
    this.b = void 0;
    this.c = void 0;
    this.d = void 0;
    this.tx = void 0;
    this.ty = void 0;
    this._temp = new Float32Array(9);
    this.multiply = this.prepend;
    // 使用矩阵后乘列向量的方式执行变换，与glsl里顺序一致
    // |  a   b   tx |      x
    // |  c   d   ty |  *   y
    // |  0   0   1  |      1
    // 变换后的新坐标为 
    // x' = ax + by + tx
    // y' = cx + dy + ty
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.tx = tx;
    this.ty = ty;
  }
  /**
    * 创建一个新的矩阵，顺序执行 scale -> rotate -> translate
    * 
    * @static
    * @param {number} [scaleX=1]
    * @param {number} [scaleY=1]
    * @param {number} [rad=0]
    * @param {number} [tx=0]
    * @param {number} [ty=0]
    * @param {Matrix2D} [out]
    * @returns {Matrix2D}
    * 
    * @memberOf Matrix2D
    */


  static SRT(scaleX = 1, scaleY = 1, rad = 0, tx = 0, ty = 0, out) {
    // 相当于
    // let m: Matrix2D = new Matrix2D();
    // m.scale(scaleX, scaleY);
    // m.rotate(rotation);
    // m.translate(tx, ty);
    let cos = Math.cos(rad);
    let sin = Math.sin(rad);

    if (out) {
      out.a = cos * scaleX;
      out.b = -sin * scaleY;
      out.c = sin * scaleX;
      out.d = cos * scaleY;
      out.tx = tx;
      out.ty = ty;
      return out;
    }

    return new Matrix2D(cos * scaleX, -sin * scaleY, sin * scaleX, cos * scaleY, tx, ty);
  }
  /**
   * 创建缩放矩阵
   * 
   * @static
   * @param {number} scaleX (description)
   * @param {number} scaleY (description)
   * @returns {Matrix2D} (description)
   */


  static FromScaling(scaleX, scaleY) {
    return new Matrix2D(scaleX, 0, 0, scaleY, 0, 0);
  }
  /**
   * 创建位置矩阵
   * 
   * @static
   * @param {number} posX (description)
   * @param {number} posY (description)
   * @returns {Matrix2D} (description)
   */


  static FromTranslation(posX, posY) {
    return new Matrix2D(1, 0, 0, 1, posX, posY);
  }

  /**
   * 创建旋转矩阵
   * 
   * @static
   * @param {number} rad 弧度值
   * @returns {Matrix2D} (description)
   */
  static FromRotation(rad) {
    let s = Math.sin(rad);
    let c = Math.cos(rad);
    return new Matrix2D(c, -s, s, c, 0, 0);
  }

  get float32Array() {
    return this.toArray(this._temp, true);
  }
  /**
   * 2*2矩阵行列式，非零则矩阵可逆
   * @returns {number}
   */


  get determinant() {
    return this.a * this.d - this.b * this.c;
  }
  /**
   * identity
   * 
   * @returns {Matrix2D}
   * 
   * @memberOf Matrix2D
   */


  identity() {
    this.a = 1;
    this.b = 0;
    this.c = 0;
    this.d = 1;
    this.tx = 0;
    this.ty = 0;
    return this;
  }
  /**
   * 添加一个移动变换
   * 
   * @param {number} tx (description)
   * @param {number} ty (description)
   * @returns {Matrix2D} (description)
   */


  translate(tx, ty) {
    //  1   0   tx     
    //  0   1   ty  *  原矩阵
    //  0   0   1     
    this.tx += tx;
    this.ty += ty;
    return this;
  }
  /**
   * 添加一个缩放变换
   * 
   * @param {number} sx (description)
   * @param {number} sy (description)
   * @returns {Matrix2D} (description)
   */


  scale(sx, sy) {
    //  sx  0   0    
    //  0   sy  0  *  原矩阵
    //  0   0   1     
    this.a *= sx;
    this.b *= sx;
    this.c *= sy;
    this.d *= sy;
    this.tx *= sx;
    this.ty *= sy;
    return this;
  }
  /**
   * 增加一个旋转变换
   * 
   * @param {number} angle (弧度值)
   * @returns {Matrix2D} (description)
   */


  rotate(angle) {
    // |  cos -sin  0|     
    // |  sin  cos  0|  *  原矩阵
    let cos = Math.cos(angle);
    let sin = Math.sin(angle);
    let _a = this.a;
    let _b = this.b;
    let _c = this.c;
    let _d = this.d;
    let _tx = this.tx;
    let _ty = this.ty;
    this.a = _a * cos - _c * sin;
    this.b = _b * cos - _d * sin;
    this.c = _a * sin + _c * cos;
    this.d = _b * sin + _d * cos;
    this.tx = _tx * cos - _ty * sin;
    this.ty = _tx * sin + _ty * cos;
    return this;
  }
  /**
   * 在此变换矩阵之前增加一个变换
   * 
   * this = this * m
   * 
   * @param {Matrix2D} m (description)
   * @returns {Matrix2D} (description)
   */


  prepend(m) {
    let _a = this.a;
    let _b = this.b;
    let _c = this.c;
    let _d = this.d;
    let _tx = this.tx;
    let _ty = this.ty;
    this.a = _a * m.a + _b * m.c;
    this.b = _a * m.b + _b * m.d;
    this.c = _c * m.a + _d * m.c;
    this.d = _c * m.b + _d * m.d;
    this.tx = _a * m.tx + _b * m.ty + _tx;
    this.ty = _c * m.tx + _d * m.ty + _ty;
    return this;
  }
  /**
   * 后乘矩阵，在此变换矩阵之前增加一个变换
   * 
   * this = this * m
   * 
   * @memberOf Matrix2D
   */


  /**
   * 前乘一个矩阵，在此变换矩阵之后增加一个变换
   * 
   *  this = m * this
   * 
   * @param {Matrix2D} m (description)
   * @returns {Matrix2D} this
   */
  append(m) {
    let _a = this.a;
    let _b = this.b;
    let _c = this.c;
    let _d = this.d;
    let _tx = this.tx;
    let _ty = this.ty;
    this.a = m.a * _a + m.b * _c;
    this.b = m.a * _b + m.b * _d;
    this.c = m.c * _a + m.d * _c;
    this.d = m.c * _b + m.d * _d;
    this.tx = m.a * _tx + m.b * _ty + m.tx;
    this.ty = m.c * _tx + m.d * _ty + m.ty;
    return this;
  }
  /**
   * 用此矩阵转换一个Vector2D表示的点
   * 
   * @param {Vector2D} p (description)
   * @param {Vector2D} [out] (description)
   * @returns {Vector2D} (description)
   */


  transformPoint(p, out) {
    // |  a   b   tx |     x
    // |  c   d   ty |  *  y
    let nx = this.a * p.x + this.b * p.y + this.tx;
    let ny = this.c * p.x + this.d * p.y + this.ty;

    if (out) {
      out.x = nx;
      out.y = ny;
      return out;
    }

    return new Vector2D(nx, ny);
  }
  /**
   * 用此矩阵转换一个向量(仅方向，不包含平移)
   * 
   * @param {Vector2D} v (description)
   * @param {Vector2D} [out=undefined] (description)
   * @returns {Vector2D} (description)
   */


  transformVector(v, out) {
    // |  a   b   tx |     x
    // |  c   d   ty |  *  y
    let nx = this.a * v.x + this.b * v.y;
    let ny = this.c * v.x + this.d * v.y;

    if (out) {
      out.x = nx;
      out.y = ny;
      return out;
    }

    return new Vector2D(nx, ny);
  }
  /**
   * 矩阵求逆
   * 
   * @returns {Matrix2D} (description)
   */
  // todo: 错的貌似


  invert() {
    let det = this.a * this.d - this.b * this.c;

    if (det !== 0) {
      det = 1 / det;
      let _a = this.a;
      let _b = this.b;
      let _c = this.c;
      let _d = this.d;
      let _tx = this.tx;
      let _ty = this.ty;
      this.a = _d * det;
      this.b = -_b * det;
      this.c = -_c * det;
      this.d = _a * det;
      this.tx = (_c * _ty - _d * _tx) * det;
      this.ty = (_b * _tx - _a * _ty) * det;
      return this;
    }

    return null;
  }
  /**
   * copyFrom
   * 
   * @param {Matrix2D} m (description)
   * @returns {Matrix2D} 返回this
   */


  copyFrom(m) {
    this.a = m.a;
    this.b = m.b;
    this.c = m.c;
    this.d = m.d;
    this.tx = m.tx;
    this.ty = m.ty;
    return this;
  }
  /**
   * copyTo
   * 
   * @param {Matrix2D} out (description)
   */


  copyTo(out) {
    out.a = this.a;
    out.b = this.b;
    out.c = this.c;
    out.d = this.d;
    out.tx = this.tx;
    out.ty = this.ty;
    return out;
  }
  /**
   * clone
   * 
   * @returns {Matrix2D} (description)
   */


  clone() {
    return new Matrix2D(this.a, this.b, this.c, this.d, this.tx, this.ty);
  }
  /**
   * 转为Float32Array, 之后可以用 gl.uniformMatrix3fv 上传
   * @param {boolean} [columnMajor=true] WebGL默认需要column major,所以默认会转置
   * @param {Float32Array} [out=undefined] (description)
   * @returns {Float32Array} (description)
   */


  toArray(out, columnMajor = true) {
    if (out === undefined) {
      out = new Float32Array(9);
    } // webGL 默认需要column major这种格式的矩阵
    // [a,c,0,b,d,0,tx,ty,1]
    //
    // | a  c  0 |
    // | b  d  0 |
    // | tx ty 1 |
    //
    // 而我们的矩阵是
    //
    // | a  b  tx|
    // | c  d  ty|
    // | 0  0  1 |
    //
    // 所以默认需要转置


    if (columnMajor) {
      out[0] = this.a;
      out[1] = this.c;
      out[2] = 0;
      out[3] = this.b;
      out[4] = this.d;
      out[5] = 0;
      out[6] = this.tx;
      out[7] = this.ty;
      out[8] = 1;
    } else {
      out[0] = this.a;
      out[1] = this.b;
      out[2] = this.tx;
      out[3] = this.c;
      out[4] = this.d;
      out[5] = this.ty;
      out[6] = 0;
      out[7] = 0;
      out[8] = 1;
    }

    return out;
  }
  /**
   * toString
   * 
   * @returns {string} (description)
   */


  toString() {
    return "[Matrix2D] (a:" + this.a + " ,b:" + this.b + " ,c:" + this.c + " ,d:" + this.d + " ,tx:" + this.tx + " ,ty:" + this.ty + ")";
  }

}

class Matrix3D {
  /*
        x   y   z   t
     -------------------
     | n11 n12 n13 n14 |
     | n21 n22 n23 n24 |
     | n31 n32 n33 n34 |
     | n41 n42 n43 n44 |
  */
  // tx
  // ty
  // tz
  constructor(p11 = 1, p12 = 0, p13 = 0, p14 = 0, p21 = 0, p22 = 1, p23 = 0, p24 = 0, p31 = 0, p32 = 0, p33 = 1, p34 = 0, p41 = 0, p42 = 0, p43 = 0, p44 = 1) {
    this.n11 = 1;
    this.n12 = 0;
    this.n13 = 0;
    this.n14 = 0;
    this.n21 = 0;
    this.n22 = 1;
    this.n23 = 0;
    this.n24 = 0;
    this.n31 = 0;
    this.n32 = 0;
    this.n33 = 1;
    this.n34 = 0;
    this.n41 = 0;
    this.n42 = 0;
    this.n43 = 0;
    this.n44 = 1;
    this._temp = new Float32Array(16);
    this.n11 = p11;
    this.n12 = p12;
    this.n13 = p13;
    this.n14 = p14;
    this.n21 = p21;
    this.n22 = p22;
    this.n23 = p23;
    this.n24 = p24;
    this.n31 = p31;
    this.n32 = p32;
    this.n33 = p33;
    this.n34 = p34;
    this.n41 = p41;
    this.n42 = p42;
    this.n43 = p43;
    this.n44 = p44;
  }
  /**
   * column major order
   */


  get float32Array() {
    return this.toArray(this._temp, true);
  }

  set float32Array(arr) {
    this.fromArray(arr, true);
  }

  setLookAt(eyeX, eyeY, eyeZ, targetX, targetY, targetZ, upX, upY, upZ) {
    let fx, fy, fz, rlf, rx, ry, rz, rls, ux, uy, uz; // foward vector

    fx = eyeX - targetX;
    fy = eyeY - targetY;
    fz = eyeZ - targetZ; // Normalize foward.

    rlf = 1 / Math.sqrt(fx * fx + fy * fy + fz * fz);
    fx *= rlf;
    fy *= rlf;
    fz *= rlf; // Calculate cross product of f and up.

    rx = fy * upZ - fz * upY;
    ry = fz * upX - fx * upZ;
    rz = fx * upY - fy * upX; // Normalize right vector.

    rls = 1 / Math.sqrt(rx * rx + ry * ry + rz * rz);
    rx *= rls;
    ry *= rls;
    rz *= rls; // Calculate cross product of r and f.

    ux = ry * fz - rz * fy;
    uy = rz * fx - rx * fz;
    uz = rx * fy - ry * fx;
    let t = this; // Set to this.

    t.n11 = rx;
    t.n12 = ux;
    t.n13 = fx;
    t.n14 = eyeX;
    t.n21 = ry;
    t.n22 = uy;
    t.n23 = fy;
    t.n24 = eyeY;
    t.n31 = rz;
    t.n32 = uz;
    t.n33 = fz;
    t.n34 = eyeZ;
    t.n41 = 0;
    t.n42 = 0;
    t.n43 = 0;
    t.n44 = 1;
  }

  identity() {
    let t = this;
    t.n11 = 1;
    t.n12 = 0;
    t.n13 = 0;
    t.n14 = 0;
    t.n21 = 0;
    t.n22 = 1;
    t.n23 = 0;
    t.n24 = 0;
    t.n31 = 0;
    t.n32 = 0;
    t.n33 = 1;
    t.n34 = 0;
    t.n41 = 0;
    t.n42 = 0;
    t.n43 = 0;
    t.n44 = 1;
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

  toArray(out, columnMajor = true) {
    let t = this;
    if (!out) out = new Float32Array(16);

    if (columnMajor) {
      out[0] = t.n11;
      out[4] = t.n12;
      out[8] = t.n13;
      out[12] = t.n14;
      out[1] = t.n21;
      out[5] = t.n22;
      out[9] = t.n23;
      out[13] = t.n24;
      out[2] = t.n31;
      out[6] = t.n32;
      out[10] = t.n33;
      out[14] = t.n34;
      out[3] = t.n41;
      out[7] = t.n42;
      out[11] = t.n43;
      out[15] = t.n44;
    } else {
      out[0] = t.n11;
      out[1] = t.n12;
      out[2] = t.n13;
      out[3] = t.n14;
      out[4] = t.n21;
      out[5] = t.n22;
      out[6] = t.n23;
      out[7] = t.n24;
      out[8] = t.n31;
      out[9] = t.n32;
      out[10] = t.n33;
      out[11] = t.n34;
      out[12] = t.n41;
      out[13] = t.n42;
      out[14] = t.n43;
      out[15] = t.n44;
    }

    return out;
  }

  fromArray(arr, columnMajor = true) {
    let t = this;

    if (columnMajor) {
      t.n11 = arr[0];
      t.n12 = arr[4];
      t.n13 = arr[8];
      t.n14 = arr[12];
      t.n21 = arr[1];
      t.n22 = arr[5];
      t.n23 = arr[9];
      t.n24 = arr[13];
      t.n31 = arr[2];
      t.n32 = arr[6];
      t.n33 = arr[10];
      t.n34 = arr[14];
      t.n41 = arr[3];
      t.n42 = arr[7];
      t.n43 = arr[11];
      t.n44 = arr[15];
    } else {
      t.n11 = arr[0];
      t.n12 = arr[1];
      t.n13 = arr[2];
      t.n14 = arr[3];
      t.n21 = arr[4];
      t.n22 = arr[5];
      t.n23 = arr[6];
      t.n24 = arr[7];
      t.n31 = arr[8];
      t.n32 = arr[9];
      t.n33 = arr[10];
      t.n34 = arr[11];
      t.n41 = arr[12];
      t.n42 = arr[13];
      t.n43 = arr[14];
      t.n44 = arr[15];
    }
  }

}

/**
 * 中心为原点,忽略z
 * @param width 
 * @param height 
 * @param flipY 如果为 false 则y轴向上为正，并且 rotation 逆时针为正。并且需要调用flipY确保贴图正确
 */

function center2D(width, height, flipY = true) {
  return new Matrix2D(2 / width, 0, 0, (flipY ? -2 : 2) / height, 0, 0);
}
/**
 * 3x3 矩阵，2D投影矩阵，忽略Z轴，直接投影为Canvas的宽高大小
 * 
 * @static
 * @param {number} width canvas width
 * @param {number} height canvas height
 * @param flipY 如果为 false 则y轴向上为正，并且 rotation 逆时针为正。并且需要调用flipY确保贴图正确
 * @returns (description)
 */

function topleft2D(width, height, flipY = true) {
  if (flipY) {
    return new Matrix2D(2 / width, 0, 0, -2 / height, -1, 1);
  } else {
    return new Matrix2D(2 / width, 0, 0, 2 / height, -1, -1);
  }
}

exports.Matrix2D = Matrix2D;
exports.Matrix3D = Matrix3D;
exports.Vector2D = Vector2D;
exports.Vector3D = Vector3D;
exports.center2D = center2D;
exports.topleft2D = topleft2D;
//# sourceMappingURL=index.js.map
