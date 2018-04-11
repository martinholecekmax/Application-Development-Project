@extends('layouts.app') 
@section('content')
<div id="app" class="container">
    <div class="row mt-4">
        <div class="col">
            <new-event></new-event>
        </div>
        <div class="col">
            <all-events></all-events>
        </div>
    </div>
</div>
@endsection