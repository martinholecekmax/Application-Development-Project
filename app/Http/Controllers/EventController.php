<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\EventResource;
use App\Event;
use JWTAuth;

class EventController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('jwt', ['except' => ['login']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $events = Event::where('user_id', auth()->user()->id)->get();
        $response = [
            'events' => $events,
            'user' => auth()->user()->id
        ];
        // $events = Event::paginate(15);
        return response()->json($response, 200);
        // return EventResource::collection($events);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'title' => 'required',
            'description' => 'required',
            'location' => 'required',
            'start_date' => 'required|date_format:Y-m-d H:i:s',
            'end_date' => 'required|date_format:Y-m-d H:i:s',
            'all_day' => 'boolean',
        ]);

        $user = JWTAuth::parseToken()->toUser();
        $event = new Event();
        $event->title = $request->input('title');
        $event->description = $request->input('description');
        $event->location = $request->input('location');
        $event->start_date = $request->input('start_date');
        $event->end_date = $request->input('end_date');
        $event->all_day = $request->input('all_day');
        $event->user_id = $user->id;
        if ($event->save()) {
            return $event;
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $event = Event::findOrFail($id);
        return $event;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'title' => 'required',
            'description' => 'required',
            'location' => 'required',
            'start_date' => 'required|date_format:Y-m-d H:i:s',
            'end_date' => 'required|date_format:Y-m-d H:i:s',
            'all_day' => 'boolean',
        ]);

        $user = JWTAuth::parseToken()->toUser();
        $event = Event::findOrFail($id);
        $event->title = $request->input('title');
        $event->description = $request->input('description');
        $event->location = $request->input('location');
        $event->start_date = $request->input('start_date');
        $event->end_date = $request->input('end_date');
        $event->all_day = $request->input('all_day');
        $event->user_id = $user->id;
        if ($event->save()) {
            return $event;
        }
    }

    /**
     * Replace specific field of the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function replace(Request $request, $id)
    {
        $user = JWTAuth::parseToken()->toUser();
        $event = Event::findOrFail($id);
        $input = $request->all();
        $event->fill($input);
        if ($event->save()) {
            return $event;
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $event = Event::findOrFail($id);
        if ($event->delete()) {
            return $event;
        }
    }
}
