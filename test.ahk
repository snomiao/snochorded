
; 雪星并击 | snochorded
; https://docs.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-getkeyboardstate?redirectedfrom=MSDN
; BOOL GetKeyboardState(
;   PBYTE lpKeyState
; );

VarSetCapacity(lpKeyState,256,0) 
#MaxHotkeysPerInterval, 200
global PressedKeySet := {}
global LeftPressedKey := ""
global RightPressedKey := ""
global OtherPressedKey := ""
; 雪星并击规则集与分手按键表{{
global LeftHandRule := {"1":"1","2":"2","3":"3","4":"4","5":"5","12":"0","13":"9","21":"0","23":"8","24":"7","31":"9","32":"8","34":"6","42":"7","43":"6","q":"q","w":"w","e":"e","r":"r","t":"t","qw":"p","wq":"p","qe":"o","eq":"o","we":"i","ew":"i","wr":"u","rw":"u","er":"y","re":"y","a":"a","s":"s","d":"d","f":"f","g":"g","as":";","sa":";","ad":"l","da":"l","sd":"k","ds":"k","sf":"j","fs":"j","df":"h","fd":"h","z":"z","x":"x","c":"c","v":"v","b":"b","zx":"/","xz":"/","zc":".","cz":".","xc":",","cx":",","xv":"m","vx":"m","cv":"n","vc":"n"}
global RightHandRule := {"0":"0","6":"6","7":"7","8":"8","9":"9","78":"1","79":"2","80":"4","87":"1","89":"3","90":"5","97":"2","98":"3","08":"4","09":"5","p":"p","y":"y","u":"u","i":"i","o":"o","ui":"q","iu":"q","uo":"w","ou":"w","io":"e","oi":"e","pi":"r","ip":"r","po":"t","op":"t",";":";","h":"h","j":"j","k":"k","l":"l","jk":"a","kj":"a","jl":"s","lj":"s","kl":"d","lk":"d",";k":"f","k;":"f",";l":"g","l;":"g","/":"/","n":"n","m":"m",",":",",".":".","m,":"z",",m":"z","m.":"x",".m":"x",",.":"c",".,":"c","/,":"v",",/":"v","/.":"b","./":"b"}
global LeftHandKeys := ["1","2","3","4","5","q","w","e","r","t","a","s","d","f","g","z","x","c","v","b"]
global RightHandKeys := ["0","6","7","8","9","p","y","u","i","o",";","h","j","k","l","/","n","m",",","."]
; }}
global OtherKeys := ["Space"]

For _, KeyName in LeftHandKeys{
    Hotkey, $%KeyName%, LeftPressKeyDown
    Hotkey, $%KeyName% Up, KeyUp
}
For _, KeyName in RightHandKeys{
    Hotkey, $%KeyName%, RightPressKeyDown
    Hotkey, $%KeyName% Up, KeyUp
}
For _, KeyName in OtherKeys{
    Hotkey, $%KeyName%, OtherPressKeyDown
    Hotkey, $%KeyName% Up, KeyUp
}
Return

LeftPressKeyDown:
LeftPressedKey .= SubStr(A_ThisHotkey , 2)
ToolTip % SubStr(A_ThisHotkey , 2)
Return

RightPressKeyDown:
RightPressedKey .= SubStr(A_ThisHotkey , 2)
Return

OtherPressKeyDown:
OtherPressedKey .= SubStr(A_ThisHotkey , 2)
Return

weeqweiyu
ni
KeyUp:
    OutputKey := ""
    OutputKey .= LeftHandRule[LeftPressedKey]
    OutputKey .= RightHandRule[RightPressedKey]
    OutputKey .= OtherPressedKey
    if(OutputKey){
        ToolTip % LeftPressedKey " + " RightPressedKey " => " OutputKey
        PressedLength := LeftPressedKey.Length + RightPressedKey.Length + (!!OtherPressedKey ? 1 : 0)
        Loop, PressedLength
            SendInput {BackSpace}
        SendInput %OutputKey%
    }
    LeftPressedKey := RightPressedKey := OtherPressedKey := ""
Return

F12:: ExitApp