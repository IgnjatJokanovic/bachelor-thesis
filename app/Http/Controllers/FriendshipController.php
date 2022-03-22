<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\FriendRequestSent;
use App\User;
use JWTAuth;

class FriendshipController extends Controller
{
    public function sendRequest()
    {

        $user = auth()->user();
        $to = User::find(request()->id);

        if ($to != null) {
            if ($to->friends->contains($to)) {
                return response()->json("Request Already sent", 422);
            } else {
                $std = new \StdClass();
                $std->from = $user;
                $std->to = $to->id;
                $to->friends()->attach($user->id);
                FriendRequestSent::dispatch($std);
                return response()->json("Friend request sent to $to->name", 200);
            }
        } else {
            return response()->json("User doesent exist", 404);
        }
    }

    public function showNotOpened()
    {
        $user = JWTAuth::parseToken()->authenticate();
        $friends = $user->friendActions()->where()->get();
    }



    public function accept()
    {
        $user = JWTAuth::parseToken()->authenticate();
        $sender = request()->id;
        $tmp = $user->friendActions()->where('sender_id', $sender)->first();
        $tmp->pivot->status = "accepted";
        $tmp->pivot->save();
        return response()->json("Success", 201);
    }

    public function openAll()
    {
        $user = JWTAuth::parseToken()->authenticate();
        $user->friendActions()->updateExistingPivot(['opened' => true]);
        return response()->json("Success", 201);
    }

    public function decline($id)
    {
        $user = JWTAuth::parseToken()->authenticate();
        $sender = request()->id;
        $tmp = $user->friendActions()->where('sender_id', $sender)->first();
        $tmp->pivot->status = "declined";
        $tmp->pivot->save();
        return response()->json("Success", 201);
    }

    public function search()
    {
        $param = request()->param;
        $payload = JWTAuth::parseToken()->getPayload();
        $id = $payload->get('id');
        $user = JWTAuth::parseToken()->authenticate();
        $friends =  $user->confirmedFriends()->where(function ($query)  use ($param) {
                        $query->where('name', 'like', "%$param%")
                            ->orWhere('surname', 'like', "%$param%");
                    });

        dd($friends);
    }
}
