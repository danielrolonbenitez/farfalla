<?php
error_reporting(-1);
class MySQL {

    private $conexion;
    private $resource;
    private $sql;
    public static $queries;
    private static $_singleton;

    public static function getInstance(){
        if (is_null (self::$_singleton)) {
            self::$_singleton = new MySQL();
        }
        return self::$_singleton;
    }

    private function __construct(){
    $host="10.0.10.18";
    $user="ciram_test";
    $pass="test2024";
    $db="ciram_web";
    $port="3306";
    $this->conexion = mysqli_connect($host,$user,$pass,$db,$port) or die('Unable to establish a NHT_DB connection');
      
       
    
        //mysqli_set_charset($this->conexion,'utf8');
        self::$queries = 0;
        $this->resource = null;
    }

    public function execute(){
        if(!($this->resource = mysqli_query($this->conexion,$this->sql))){
            return null;
        }
        self::$queries++;
        return $this->resource;
    }

    public function alter(){
        if(!($this->resource = mysqli_query($this->conexion,$this->sql))){
            return false;
        }
        return true;
    }

    public function getNumRows(){
        if (!($cur = $this->execute())){
            return null;
        }
        $cantidad = mysqli_num_rows($cur);
        return $cantidad;
    }

    public function loadObjectList(){
        if (!($cur = $this->execute())){
            return null;
        }
        $array = array();

        while ($row = @mysqli_fetch_object($cur)){
            $array[] = $row;


        }

        return $array;
    }



    public function setQuery($sql){
        if(empty($sql)){
            return false;
        }
        $this->sql = $sql;
        return true;
    }

    public function getId(){
        $id = $this->resource = mysqli_insert_id($this->conexion);
        return $id;
    }

    public function freeResults(){
        @mysql_free_result($this->resource);
        return true;
    }

    public function loadObject(){
        if ($cur = $this->execute()){
            if ($object = mysqli_fetch_object($cur)){
                @mysqli_free_result($cur);
                return $object;
            }
            else {
                return null;
            }
        }
        else {
            return false;
        }
    }

    function __destruct(){
        @mysqli_free_result($this->resource);
        @mysqli_close($this->conexion);
    }


     public function getAffectRows(){
        $cantidad = mysqli_affected_rows($this->conexion);
        return $cantidad;
    }






}
?>