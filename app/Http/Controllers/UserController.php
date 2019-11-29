<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function create(){
        // dd(request()->all());
        $birth_timestamp = mktime(0, 0, 0, request()->month, request()->day, request()->year);
        $birthday =  date("d-m-Y",$birth_timestamp);
        dd($birthday);
    }
}
