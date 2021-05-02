<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Emotion;

class ReactionsController extends Controller
{
    public function index()
    {
        $emotions = Emotion::all();
        return response()->json($emotions);
    }
}
