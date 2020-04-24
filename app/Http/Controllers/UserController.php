<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\User;
use Validator;
use JWTAuth;

class UserController extends Controller
{
    public function create()
    {

        $validator = Validator::make(request()->all(), [
            'firstName' => 'required|string|max:255',
            'lastName' =>  'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'gender' => 'required'
        ]);

        if ($validator->fails()) {

            $errors = array();
            foreach ($validator->errors()->all() as $error) {
                array_push($errors, $error);
            }
            return response()->json(["messages" => $errors], 422);
        } else {
            // dd(request()->all());
            $birth_timestamp = mktime(0, 0, 0, request()->month, request()->day, request()->year);
            $birthday = date("Y-m-d H:i:s", $birth_timestamp);
            User::create([
                'name' => request()->firstName,
                'surname' => request()->lastName,
                'email' => request()->email,
                'password' => bcrypt(request()->password),
                'gender' => request()->gender,
                'birthday' => $birthday,
                'slug' => md5(request()->firstName . request()->email . request()->lastName),
            ]);

            return response()->json("Thank you for registering, activation link has been sent to your email", 201);


            // dd($birthday);
        }
    }

    public function login()
    {
        $credentials = request()->only(['email', 'password']);
        $validator = Validator::make($credentials, [
            'email' => 'required|email',
            'password' => 'required|alpha_num',
        ]);
        if ($validator->fails()) {
            $errors = array();
            foreach ($validator->errors()->all() as $error) {
                array_push($errors, $error);
            }
            return response()->json(["messages" => $errors], 422);
        } else {
            $token = auth()->attempt($credentials);
            if ($token) {
                return response()->json(['token' => $token]);
            } else {
                return response()->json(['messages' => ['Invalid username or password']], 401);
            }
        }
    }
    public function logout()
    {
        auth()->logout();
        return response()->json(['messages' => 'Successfully logged out'], 200);
    }

    public function search()
    {
        $param = request()->param;
        $users = User::where(function ($query)  use ($param) {
            $query->where('name', 'like', "%$param%")
                ->orWhere('surname', 'like', "%$param%");
        })->get();
        return response()->json($users, 200);
    }

    public function show($slug)
    {
        $user = User::where('slug', $slug)->first();
        if ($user != null) {
            return response()->json($user, 200);
        } else {
            return response()->json("User not found", 404);
        }
    }
}
