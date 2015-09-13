var taskList = new Array();


$(document).ready(function(){
    var $newTaskInput = $('#newTaskInput');
    var $taskList = $('taskList');
    var taskTouchStart;
    var taskTouchEnd;
    var TouchStartX;
    var taskTouchEndX;

    if( window.localStorage )
    {
    taskList = JSON.parse(window.localStorage.getItem('taskList'));
     }

    if(null !== taskList)
    {
        for(i=0;i<taskList.length;i++)
        {
         var newTask = '<li data-key="' + taskList[i].key + '"><span>' + taskList[i].task + '</span></li>';
            $taskList.apend( newTask );
         }
    }
    else
    {
        taskList = new Array();
     }

    $('#addNewTask').on('click', function(){
    var key = Date.now();
    var newTask = '<li data-key="' + key + '"><span>' + $newTaskInput.val() + '</span></li>'
    $taskList.append( newTask);
    taskList.push({key:key, task:$newTaskInput.val(), done:false});
    if(window.localStorage)
    {
        window.localStorage.setItem('taskList', JSON.stringify(taskList));
     }
    $newTaskInput.val('');
     });

    $taskList.on('touchstart', 'li', function(e){
        var start = document.elementFromPoint( e.originalEvent.touches[0].pageX, e.originalEvent.touches[0].pageY );
        taskTouchStart = $(start).attr('data-key');
        taskTouchStartX = e.originalEvent.touches[0].pageX;
    });

    $taskList.on('touchstart', 'li', function(e){
        var $end;
        var end = document.elementFromPoint( e.originalEvent.touches[0].pageX, e.originalEvent.touches[0].pageY );
        $end = $(end);
        taskTouchEnd = $end.attr('data-key');
        taskTouchEndX =  e.originalEvent.touches[0].pageX;
        
        if(taskTouchStart == taskTouchEnd)
        {
            if(taskTouchStartX < taskTouchEndX)
            {
                if($this.hasClass('done'))
                {
                    $this.removeClass('done')
                 }
                else{
                    $this.addClass('done');
                 }
             }
            else{
                taskList = $.grip(taskList, function(e){ return e.key != taskTouchEnd;});
                if(window.localStorage)
                {
                    window.localStorage.setItem('taskList', JSON.stringify(taskList));
                }
                $end.remove();
             }
        }   
     });
 });