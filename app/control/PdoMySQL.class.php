<?php
class PdoMySQL{
    public static $config = array();// 设置连接参数，配置信息
    public static $link = null;// 保存连接标识符
    public static $pconnect = false;// 是否开启长连接
    public static $dbVersion = null;// 保存数据库版本
    public static $connetced = false;// 判断是否连接成功
    public static $PDOStatement=null;// 保存PDOStatement对象
    public static $queryStr =null;// 保存最后执行的操作
    public static $error = null;// 保存错误信息
    public static $lastInsertId = null;// 保存最后插入记录的id值
    public static $numRows = 0;// 上一步操作产生的受影响的记录的条数
    public function __construct($dbConfig=''){
        // 检测PDO是否支持
        if (!class_exists("PDO")){
            self::throw_exception('不支持PDO，请先开启');
        }
        if (!is_array($dbConfig)){
            $dbConfig = array(
                'hostname' => DB_HOST,
                'username' => DB_USER,
                'password' => DB_PWD,
                'database' => DB_NAME,
                'hostport' => DB_PORT,
                'dbms' => DB_TYPE,
                'dsn' => DB_TYPE.":host=".DB_HOST.";dbname=".DB_NAME
            );
        }
        if (empty($dbConfig['hostname']))self::throw_exception('没有定义数据库配置，请先定义');
        self::$config = $dbConfig;
        if(empty(self::$config['params']))self::$config['params']=array();
        if(!isset(self::$link)){
            $configs = self::$config;
            if(self::$pconnect){
                // 开启长连接，添加到配置数组中
                $configs['params'][constant("PDO::ATTR_PERSISTENT")]=true;
            }
            try{
                self::$link = new PDO($configs['dsn'],$configs['username'],$configs['password'],$configs['params']);
            }catch (PDOException $e){
                self::throw_exception($e->getMessage());
            }
            if(!self::$link){
                self::throw_exception('PDO连接错误');
                return false;
            }
            self::$link->exec('set names'.DB_CHARSET);
            self::$dbVersion = self::$link->getAttribute(constant("PDO::ATTR_SERVER_VERSION"));
            self::$connetced = true;
            unset($configs);
        }
    }

    /**
     * 得到所有记录
     * @param null $sql sql语句
     * @return mixed
     */
    public static function getAll($sql=null){
        if($sql!=null){
            self::query($sql);
        }
        $result = self::$PDOStatement->fetchAll(constant("PDO::FETCH_ASSOC"));
        return $result;
    }

    /**
     * 得到结果集中的一条记录
     * @param null $sql sql语句
     * @return mixed
     */
    public static function getRow($sql=null){
        if ($sql!=null){
            self::query($sql);
        }
        $result = self::$PDOStatement->fetch(constant("PDO::FETCH_ASSOC"));
        return $result;
    }

    /**
     * 执行增删改操作，返回受影响的记录的条数
     * @param null $sql sql语句
     * @return bool
     */
    public static function execute($sql=null){
        $link=self::$link;
        if(!$link)return false;
        self::$queryStr = $sql;
        if(!empty(self::$PDOStatement))self::free();
        $result = $link->exec(self::$queryStr);
        self::haveErrorThrowException();
        if ($result){
            self::$lastInsertId = $link->lastInsertId();
            self::$numRows = $result;
            return self::$numRows;
        }else{
            return false;
        }
    }

    public static function findById(){
//        $sql =
    }

    /**
     * 释放结果集
     */
    public static function free(){
        self::$PDOStatement = null;
    }

    /**
     * 执行sql语句
     * @param string $sql
     * @return bool
     */
    public static function query($sql=''){
        $link = self::$link;
        if(!$link) return false;
        // 判断之前是否有结果集，如果有则释放结果集
        if (!empty(self::$PDOStatement))self::free();
        // 保存最后执行的操作语句
        self::$queryStr = $sql;
        self::$PDOStatement = $link->prepare(self::$queryStr);
        $res = self::$PDOStatement->execute();
        self::haveErrorThrowException();
        return $res;
    }

    /**
     * 获得错误信息
     */
    public static function haveErrorThrowException(){
        $obj = empty(self::$PDOStatement)?self::$link : self::$PDOStatement;
        $arrError = $obj->errorInfo();
        if($arrError[0]!='00000'){
            self::$error = 'SQLSTATE: '.$arrError[0].'<br/>SQL Error: '.$arrError[2].'<br/>Error SQL: '.self::$queryStr;
            self::throw_exception(self::$error);
            return false;
        }
        if (self::$queryStr==''){
            self::throw_exception('没有执行的SQL语句');
            return false;
        }
    }

    /**
     * 自定义错误处理
     * @param $errMsg 错误信息
     */
    public static function throw_exception($errMsg){
        echo '<div style="width: 80%;background-color: #ABCDEF;color:black;font-size:20px;padding: 20px 0px;">' . $errMsg. '</div>';
    }
}
