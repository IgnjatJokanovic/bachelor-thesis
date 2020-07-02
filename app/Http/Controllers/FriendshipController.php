<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\FriendRequestSent;
use App\User;

class FriendshipController extends Controller
{
    public function sendRequest()
    {
        $user = auth()->user();
        $to = User::find(request()->user->id);
        // $to->friends()->attach($user->id, ['status' => "PENDING"]);
        $user->friend_id = $to->id;
        FriendRequestSent::dispatch($user);
        return response()->json("Friend request sent to $to->name", 200);
    }
}
