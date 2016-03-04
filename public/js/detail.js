$(function() {
    $('.comment').click(function() {
        var cid = $(this).data('cid');
        var tid = $(this).data('tid');
        $('<input>').attr({
        	type:'hidden',
        	name:'comment[cid]',
        	value:cid
        }).appendTo('#fromComnent');
        $('<input>').attr({
        	type:'hidden',
        	name:'comment[tid]',
        	value:tid
        }).appendTo('#fromComnent');
    });
})
